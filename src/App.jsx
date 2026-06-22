import { CompileAndRunJava } from "./compiler/java-compiler"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
import { DEFAULT_JAVA_CODE } from "./defaults"

function App() {
	const [code, setCode] = useState("")
	const [userInput, setUserInput] = useState("")

	return <>

		<div className="flex justify-between">
			<Editor 
				height="75vh"
				width="50%"
				theme="vs-dark"
				defaultLanguage="java"		
				defaultValue={DEFAULT_JAVA_CODE}
				onChange={(value) => setCode(value)}
			/>

			<div className="flex flex-col w-[50%] bg-slate-600 ">
				<span className="font-mono pl-4 text-xl">Console</span>
				<pre 
					id="console"
					className="h-full px-4 py-4 overflow-scroll"
				></pre>
			</div>
		</div>

		<div className="font-mono mt-5 flex justify-around items-start">
			<div>
				<p className="text-xl mb-4">NOTE: Each input should be on separate-line</p>
				<textarea
					className="w-xs h-32 border border-black py-2 pl-4 "
					placeholder="enter you input..."
					onChange={(e) => setUserInput(e.target.value)}
				/>
			</div>

			<button 
				className="bg-black px-5 py-4 text-white rounded-md cursor-pointer mr-1 font-mono"
				onClick={() => CompileAndRunJava("Main", code, userInput)}
			>build&&run</button>
		</div>

	</>
}

export default App
