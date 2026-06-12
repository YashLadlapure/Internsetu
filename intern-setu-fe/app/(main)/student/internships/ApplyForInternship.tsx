import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { callBackend } from "@/actions/backend-proxy";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectStudentInternshipById, setApplidToInternship } from "@/lib/features/student/studentSlice";


interface ApplyForInternshipProps {
  internshipId: number | string;
  onClose: () => void;
}

interface QuestionResponseRow {
  question: string;
  answer: string;
}

const ApplyForInternship = ({ internshipId, onClose }: ApplyForInternshipProps) => {

  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [questionResponses, setQuestionResponses] = useState<QuestionResponseRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dispatch = useAppDispatch();


  const internship = useAppSelector(selectStudentInternshipById(internshipId));

  useEffect(() => {
    if (internship?.applicationQuestions && internship.applicationQuestions.length > 0) {
      setQuestionResponses(
        internship.applicationQuestions.map((q) => ({
          question: q,
          answer: "",
        }))
      );
    }
  }, [internship?.id, internship?.applicationQuestions]);

  const payloadQuestionResponses = useMemo(() => {
    return Object.fromEntries(
      questionResponses
        .filter((item) => item.question.trim() && item.answer.trim())
        .map((item) => [item.question, item.answer])
    );
  }, [questionResponses]);

  const updateQuestionAnswer = (index: number, answer: string) => {
    setQuestionResponses((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], answer };
      return copy;
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const body = {
        internshipId: Number(internshipId),
        coverLetter,
        appliedWithResumeUrl: resumeUrl,
        questionResponses: payloadQuestionResponses,
      };

      const res = await callBackend("/student/internship/" + internshipId + "/apply", "POST", body);
      if (!res.success) throw new Error(res.data?.message || "Failed to apply");

      setSuccess("Application submitted successfully.");
      dispatch(setApplidToInternship(internshipId));    
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-200 dark:border-neutral-800 p-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Applying to</p>
            <h2 className="text-lg font-semibold">{internship?.title}</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{internship?.company.name}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="space-y-6 p-4">
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Cover Letter</p>
            <textarea
              value={coverLetter}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCoverLetter(e.target.value)}
              placeholder="Share a brief cover letter for this internship"
              className="mt-2 w-full rounded-xl border border-neutral-300 bg-white p-3 text-sm text-neutral-900 outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-600 dark:focus:ring-neutral-800"
              rows={5}
            />
          </div>

          <div>
            <Input
              label="Resume URL"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="Link to your resume"
            />
          </div>

          {internship?.requiredSkills && internship.requiredSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                {internship.requiredSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 rounded-full text-neutral-800 dark:text-neutral-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {questionResponses.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Application Questions</p>
              <div className="space-y-4">
                {questionResponses.map((row, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">{index + 1}. {row.question}</p>
                    <textarea
                      value={row.answer}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateQuestionAnswer(index, e.target.value)}
                      placeholder="Type your answer here"
                      className="w-full rounded-lg border border-neutral-300 bg-white p-2 text-sm text-neutral-900 outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-600 dark:focus:ring-neutral-800"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(error || success) && (
            <div className={`rounded-xl p-3 text-sm ${error ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"}`}>
              {error || success}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit application"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForInternship;
