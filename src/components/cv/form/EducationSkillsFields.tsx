import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { AISuggestions } from "../AISuggestions";

interface EducationSkillsFieldsProps {
  form: UseFormReturn<any>;
  cvId?: string;
}

export const EducationSkillsFields = ({ form, cvId }: EducationSkillsFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="education"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Education</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your educational background"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
            {cvId && <AISuggestions cvId={cvId} fieldName="education" content={field.value} />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List your key skills"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
            {cvId && <AISuggestions cvId={cvId} fieldName="skills" content={field.value} />}
          </FormItem>
        )}
      />
    </>
  );
};