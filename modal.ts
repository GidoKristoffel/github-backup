import { App, ButtonComponent, Modal, Setting, TextAreaComponent } from "obsidian";

export class BackupModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('GitHub backup');

		this.addCommitInput(contentEl);
		this.addBtn(contentEl);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	private addCommitInput(contentEl: HTMLElement): void {
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
		new Setting(contentEl)
			.setClass('backup-modal-btn')
			.addButton((btn: ButtonComponent) => btn.setButtonText('Do backup'))
	}
}
