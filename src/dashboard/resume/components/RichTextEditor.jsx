import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = `position title: {positionTitle}, Based on the position title, generate 5-7 bullet points for my experience in a resume. Provide the result in valid HTML <ul> tags without experience levels or JSON formatting.`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue );
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

 const GenerateSummaryFromAI = async () => {
  const positionTitle = resumeInfo?.experience[index]?.title;
  if (!positionTitle) {
    toast("Please add a Position Title.");
    return;
  }

  setLoading(true);

  try {
    const prompt = PROMPT.replace("{positionTitle}", positionTitle);
    const result = await AIChatSession.sendMessage(prompt);
    const responseText = await result.response.text();

    console.log("AI Response:", responseText); // Debug AI response
    let extractedBulletPoints = [];

    // Parse the AI response as JSON or fallback to HTML extraction
    try {
      const parsedResponse = JSON.parse(responseText);
      if (parsedResponse.bulletPoints && Array.isArray(parsedResponse.bulletPoints)) {
        extractedBulletPoints = parsedResponse.bulletPoints;
      } else {
        throw new Error("Invalid JSON structure");
      }
    } catch (error) {
      console.warn("Failed to parse as JSON. Attempting to extract from HTML:", error);
      const listItems = responseText.match(/<li>(.*?)<\/li>/g)?.map(item => item.replace(/<\/?li>/g, ""));
      if (listItems?.length) {
        extractedBulletPoints = listItems;
      } else {
        console.error("Unable to extract bullet points");
        toast("Invalid response format.");
      }
    }

    if (extractedBulletPoints.length > 0) {
      const bulletPointsHTML = `<ul>${extractedBulletPoints
        .map((point) => `<li>${point}</li>`)
        .join("")}</ul>`;
      setValue(bulletPointsHTML);
      onRichTextEditorChange({ target: { value: bulletPointsHTML } });
    } else {
      toast("No valid bullet points generated.");
    }
  } catch (error) {
    console.error("Error generating summary from AI:", error);
    toast("Failed to generate summary from AI.");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
