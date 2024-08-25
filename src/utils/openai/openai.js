import { decrementString, incrementString } from "../common";
import { addAiAnalyses } from "../cookies";

const { default: OpenAI } = require("openai");

const key = decrementString("tl.qspk.n:DkMvIfIy25FXuE:Oe.uuc5LdzOH:U[x9nYQUpPcSUQqbJrBFhRvND4KUDniVJR{743dqIybFU4CmclGKnP19jGy:svKs1rOOdS[SClukwtEWl6UYx44gsE1Gfoy[24ESkDlBw53RZZSToJRhTHxn7.4:BB")

async function aiAnalyseText(text,setAnalysis){
    const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true } );
    const prompt = `Provide a structured summary in the markdown format of (using only # , ## , ### markups) : ${text}`
    try {
        const result = await openai.chat.completions.create({  
          messages: [{ role: "user", content: prompt }],
          model: "gpt-4-turbo-2024-04-09",
        });
        console.log("response", result.choices[0].message.content);
        setAnalysis(result.choices[0].message.content);
        addAiAnalyses()
      } catch (e) {
        console.log(e);
        setAnalysis("Something is going wrong, Please try again.");
      }
}

async function aiAnalyseCarbon(text,setAnalysis){
  setAnalysis("")
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true } );
  const prompt = `Provide a natural language description of the following carbon emissions information in markdown format : ${text}`
  try {
      const result = await openai.chat.completions.create({  
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4-turbo-2024-04-09",
      });
      console.log("response", result.choices[0].message.content);
      var res = result.choices[0].message.content
      setAnalysis(res.substring(res.indexOf('#')));
      addAiAnalyses()
    } catch (e) {
      console.log(e);
      setAnalysis("Something is going wrong, Please try again.");
    }
}

export { aiAnalyseCarbon,aiAnalyseText }



