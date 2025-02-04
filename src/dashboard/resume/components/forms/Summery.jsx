import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = 
  'Job Title: {jobTitle}, Depends on job title give me a list of summary for 3 experience levels: Senior, Mid Level, and Fresher, in 3-4 lines in array format. Each object should contain "summary" and "experience_level" fields in JSON format.';

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    setAiGenerateSummeryList([]); // Clear previous data
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    console.log("Generated Prompt:", PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      const parsedResponse = JSON.parse(responseText);

      console.log("Parsed Response:", parsedResponse); // Debugging response

      if (Array.isArray(parsedResponse)) {
        setAiGenerateSummeryList(parsedResponse);
      } else if (parsedResponse["Full Stack Developers"]) {
        setAiGenerateSummeryList(parsedResponse["Full Stack Developers"]);
      } else {
        console.error("Unexpected AI response structure:", parsedResponse);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summaries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summery: summery,
      },
    };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      enabledNext(true);
      toast.success("Details updated");
    } catch (error) {
      toast.error("Error updating details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <Brain className="h-4 w-4" />} 
              Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {Array.isArray(aiGeneratedSummeryList) ? (
            aiGeneratedSummeryList.map((item, index) => (
              <div
                key={index}
                onClick={() => setSummery(item.summary)}
                className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
              >
                <h2 className="font-bold my-1 text-primary">Level: {item.experience_level}</h2>
                <p className='text-[20px]'>{item.summary}</p>
              </div>
            ))
          ) : (
            <p>No summaries available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Summery;
