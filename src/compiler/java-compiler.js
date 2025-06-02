(async () => {
	await cheerpjInit()
})()

export async function CompileAndRunJava(fileName, userCode, userInput) {
	// dummy-for clearing console before compileNrun
	const consoleEl = document.getElementById("console")
	if (consoleEl) consoleEl.textContent = ""

	// when code requires user-input
	if (userInput) {
		await cheerpOSAddStringFile("/str/input.txt", userInput)
		userCode = injectInputRedirector(userCode)
	}

	// default-way
	await cheerpOSAddStringFile(`/str/${fileName}.java`, userCode)

	try {
		const exitCode = await cheerpjRunMain("com.sun.tools.javac.Main", "/app/bin/javac.jar:/files/", `/str/${fileName}.java`, "-d", "/files/")
		if (exitCode === 0) {
			await cheerpjRunMain(`${fileName}`, "/app/bin/javac.jar:/files/")
		}
	} catch (e) {
		console.log("Error compiling to bytecode...", e.message())
	}

}

function injectInputRedirector(userCode) {
	const redirectorCode = ` try { System.setIn(new java.io.FileInputStream("/str/input.txt")); } catch (Exception e) { System.out.println("File not found."); }`
	const JAVA_MAIN_REGEX = /\s*public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/;

	// replaces userCode with System.in Override
	userCode = userCode.replace(JAVA_MAIN_REGEX, (foundMatch) => { 
		return foundMatch.trim() + " " + redirectorCode
	})
	return userCode
}
