import * as vscode from "vscode";
import { TestAdapter, TestLoadStartedEvent, TestLoadFinishedEvent, TestRunStartedEvent, TestRunFinishedEvent, TestSuiteEvent, TestEvent } from "vscode-test-adapter-api";
import { Log } from "vscode-test-adapter-util";
import { loadTests, runTests } from "./tests";

export class LuaTestAdapter implements TestAdapter {

	private disposables: { dispose(): void }[] = [];

	private readonly testsEmitter = new vscode.EventEmitter<TestLoadStartedEvent | TestLoadFinishedEvent>();
	private readonly testStatesEmitter = new vscode.EventEmitter<TestRunStartedEvent | TestRunFinishedEvent | TestSuiteEvent | TestEvent>();
	private readonly autorunEmitter = new vscode.EventEmitter<void>();

	get tests(): vscode.Event<TestLoadStartedEvent | TestLoadFinishedEvent> { return this.testsEmitter.event; }
	get testStates(): vscode.Event<TestRunStartedEvent | TestRunFinishedEvent | TestSuiteEvent | TestEvent> { return this.testStatesEmitter.event; }
	get autorun(): vscode.Event<void> | undefined { return this.autorunEmitter.event; }

	constructor(
		public readonly workspace: vscode.WorkspaceFolder,
		private readonly log: Log
	) {
		this.log.info("Initializing Lua Test Adapter");
		this.disposables.push(this.testsEmitter);
		this.disposables.push(this.testStatesEmitter);
		this.disposables.push(this.autorunEmitter);
	}

	async load(): Promise<void> {
		this.log.info("Loading LuaUnit tests");
		this.testsEmitter.fire(<TestLoadStartedEvent>{ type: "started" });
		const loadedTests = await loadTests();
		this.testsEmitter.fire(<TestLoadFinishedEvent>{ type: "finished", suite: loadedTests });
	}

	async run(tests: string[]): Promise<void> {
		this.log.info(`Running LuaUnit tests ${JSON.stringify(tests)}`);
		this.testStatesEmitter.fire(<TestRunStartedEvent>{ type: "started", tests });
		await runTests(tests, this.testStatesEmitter);
		this.testStatesEmitter.fire(<TestRunFinishedEvent>{ type: "finished" });
	}

/*	implement this method if your TestAdapter supports debugging tests
	async debug(tests: string[]): Promise<void> {
		// start a test run in a child process and attach the debugger to it...
	}
*/

	cancel(): void {
		// in a "real" TestAdapter this would kill the child process for the current test run (if there is any)
		throw new Error("Method not implemented.");
	}

	dispose(): void {
		this.cancel();
		for (const disposable of this.disposables) {
			disposable.dispose();
		}
		this.disposables = [];
	}
}
