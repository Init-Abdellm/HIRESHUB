import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { PersonalInfoFields } from "./form/PersonalInfoFields";
import { ExperienceFields } from "./form/ExperienceFields";
import { EducationSkillsFields } from "./form/EducationSkillsFields";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ID } from "appwrite";

const formSchema = z.object({
  title: z.string().min(1, "CV title is required"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  summary: z.string().min(50, "Professional summary should be at least 50 characters"),
  experience: z.string().min(100, "Work experience should be detailed (min. 100 characters)"),
  education: z.string().min(50, "Education details should be at least 50 characters"),
  skills: z.string().min(20, "Skills section should list at least a few key skills"),
  template: z.string().default("modern"),
});

const templates = [
  { id: "modern", name: "Modern", preview: "/templates/modern.png" },
  { id: "professional", name: "Professional", preview: "/templates/professional.png" },
  { id: "creative", name: "Creative", preview: "/templates/creative.png" },
];

const sections = [
  { id: "personal-info", title: "Personal Information" },
  { id: "summary", title: "Professional Summary" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
];

interface CVFormProps {
  activeCV?: any;
  onSave: (cv: any) => void;
}

export const CVForm = ({ activeCV, onSave }: CVFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sectionOrder, setSectionOrder] = useState(sections);
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: activeCV?.title || "",
      fullName: activeCV?.content?.fullName || "",
      email: activeCV?.content?.email || "",
      phone: activeCV?.content?.phone || "",
      summary: activeCV?.content?.summary || "",
      experience: activeCV?.content?.experience || "",
      education: activeCV?.content?.education || "",
      skills: activeCV?.content?.skills || "",
      template: activeCV?.template || "modern",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const session = await account.get();
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "Please log in to save your CV",
          variant: "destructive",
        });
        return;
      }

      const cvData = {
        title: values.title,
        user_id: session.$id,
        template: values.template,
        sections_order: sectionOrder.map(s => s.id),
        content: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          summary: values.summary,
          experience: values.experience,
          education: values.education,
          skills: values.skills,
        },
      };

      let response;
      if (activeCV) {
        response = await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.CVS,
          activeCV.id,
          cvData
        );
        toast({
          title: "CV Updated",
          description: "Your CV has been successfully updated.",
        });
      } else {
        response = await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.CVS,
          ID.unique(),
          cvData
        );
        toast({
          title: "CV Created",
          description: "Your CV has been successfully created.",
        });
      }

      onSave(response);
    } catch (error: any) {
      console.error('Error saving CV:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSectionOrder(items);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {templates.map((template) => (
              <FormField
                key={template.id}
                control={form.control}
                name="template"
                render={({ field }) => (
                  <div
                    className={`relative rounded-lg border-2 p-2 cursor-pointer transition-all ${
                      field.value === template.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                    onClick={() => field.onChange(template.id)}
                  >
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="text-center mt-2 font-medium">{template.name}</p>
                  </div>
                )}
              />
            ))}
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Software Engineer CV" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="cv-sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6"
                >
                  {sectionOrder.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                        >
                          <h3 className="text-lg font-medium mb-4">{section.title}</h3>
                          {section.id === "personal-info" && <PersonalInfoFields form={form} />}
                          {section.id === "summary" && <ExperienceFields form={form} cvId={activeCV?.id} />}
                          {section.id === "education" && <EducationSkillsFields form={form} cvId={activeCV?.id} />}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {activeCV ? 'Update CV' : 'Create CV'}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};
