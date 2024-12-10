import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { AISuggestions } from "../AISuggestions";

interface ExperienceFieldsProps {
  form: UseFormReturn<any>;
  cvId?: string;
}

export const ExperienceFields = ({ form, cvId }: ExperienceFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Summary</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief overview of your professional background and goals"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
            {cvId && <AISuggestions cvId={cvId} fieldName="summary" content={field.value} />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Experience</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your work experience"
                className="min-h-[200px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
            {cvId && <AISuggestions cvId={cvId} fieldName="experience" content={field.value} />}
          </FormItem>
        )}
      />
    </>
  );
};