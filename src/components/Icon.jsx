import {
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiJupyter, SiHuggingface, SiStreamlit,
  SiSupabase, SiGithub, SiPowerbi, SiMicrosoftexcel, SiPowerautomate, SiMicrosoftsharepoint,
  SiC, SiSiemens, SiLinkedin, SiJavascript, SiHtml5, SiCss3, SiOpenjdk, SiNvidia, SiHackerrank, SiAmazonwebservices, SiLinux,
  SiCplusplus, SiTypescript, SiTensorflow, SiKeras, SiPytorch, SiOpencv, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiTailwindcss, SiMongodb, SiMysql, SiIbm, SiVercel, SiCodechef, SiLeetcode, SiFreecodecamp, SiCodingninjas,
} from 'react-icons/si'
import {
  LuBrainCircuit, LuBarChartBig, LuScale, LuShieldCheck, LuSparkles, LuDatabase,
  LuGraduationCap, LuBookOpen, LuAward, LuBriefcase, LuCode2, LuCpu, LuWifi, LuNetwork, LuWorkflow, LuFactory, LuWrench, LuCloud,
  LuLayers, LuMic, LuTrophy, LuBot, LuBoxes,
} from 'react-icons/lu'

const map = {
  python: SiPython, pandas: SiPandas, numpy: SiNumpy, sklearn: SiScikitlearn, jupyter: SiJupyter,
  huggingface: SiHuggingface, streamlit: SiStreamlit, supabase: SiSupabase, github: SiGithub,
  powerbi: SiPowerbi, excel: SiMicrosoftexcel, powerautomate: SiPowerautomate,
  sharepoint: SiMicrosoftsharepoint, c: SiC, siemens: SiSiemens, linkedin: SiLinkedin,
  brain: LuBrainCircuit, chart: LuBarChartBig, scale: LuScale, shield: LuShieldCheck,
  sparkles: LuSparkles, sql: LuDatabase, grad: LuGraduationCap, book: LuBookOpen,
  award: LuAward, briefcase: LuBriefcase,
  javascript: SiJavascript, html: SiHtml5, css: SiCss3, java: SiOpenjdk,
  nvidia: SiNvidia, hackerrank: SiHackerrank, aws: SiAmazonwebservices, linux: SiLinux,
  factory: LuFactory, wrench: LuWrench, cloud: LuCloud,
  cpp: SiCplusplus, typescript: SiTypescript, tensorflow: SiTensorflow, keras: SiKeras, pytorch: SiPytorch,
  opencv: SiOpencv, react: SiReact, nextjs: SiNextdotjs, node: SiNodedotjs, express: SiExpress,
  tailwind: SiTailwindcss, mongodb: SiMongodb, mysql: SiMysql, ibm: SiIbm, vercel: SiVercel,
  codechef: SiCodechef, leetcode: SiLeetcode, freecodecamp: SiFreecodecamp, codingninjas: SiCodingninjas,
  layers: LuLayers, mic: LuMic, trophy: LuTrophy, bot: LuBot, blocks: LuBoxes,
  code: LuCode2, chip: LuCpu, iot: LuWifi, network: LuNetwork, workflow: LuWorkflow,
}

export default function Icon({ name, className = '' }) {
  const C = map[name] || LuSparkles
  return <C className={className} aria-hidden="true" />
}
