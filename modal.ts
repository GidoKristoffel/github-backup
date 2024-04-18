import { App, ButtonComponent, Modal, Setting, TextAreaComponent, TextComponent } from "obsidian";

const template: string =
	`<div>
		<label for="commit">Comment message</label>
		<textarea id="commit" placeholder="Enter your commit" rows="8"></textarea>
	</div>
	
	<style>
		/*div {*/
		/*	width: 100%;*/
		/*}*/
		
		/*textarea {*/
		/*	width: 100%;*/
		/*	resize: none;*/
		/*}*/
		
		/*label {*/
		/*	display: block;*/
		/*	margin: 4px 0;*/
		/*	padding-top: 4px;*/
		/*	border-top: 1px solid;*/
		/*}*/
	</style>`;

export class BackupModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		// contentEl.setCssStyles({fontWeight: 'bold'});
		contentEl.setText('GitHub backup');

		this.addCommitInput(contentEl);
		this.addBtn(contentEl);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	private addCommitInput(contentEl: HTMLElement): void {
		// const node: DocumentFragment = new DocumentFragment();
		// const nodeHtml: HTMLDivElement = document.createElement("div");
		// nodeHtml.innerHTML = template;
		// node.append(nodeHtml);
		// contentEl.append(node);
		new Setting(contentEl)
			.setClass('backup-modal-textarea')
			.setName('Commit message')
			.addTextArea((text: TextAreaComponent) => {
				text.inputEl.rows = 5;
				text.inputEl.setCssStyles({resize: 'none'});
				text.setPlaceholder('Enter your commit')
					.setValue('')
					.onChange(async (value: string): Promise<void> => {})
			});
	}

	private addBtn(contentEl: HTMLElement): void {
		new Setting(contentEl).setClass('backup-modal-btn').addButton((btn: ButtonComponent) => btn.setButtonText('Do backup'))
	}
}
