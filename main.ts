import { Plugin } from 'obsidian';
import { BackupModal } from "./modal";
import { DEFAULT_SETTINGS, MainSettings, SampleSettingTab } from "./settings";


export default class Main extends Plugin {
	settings: MainSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		const ribbonIconEl: HTMLElement =
			this.addRibbonIcon(
				'database-backup',
				'GitHub backup',
				(): void => new BackupModal(this.app).open()
			);

		ribbonIconEl.addClass('github-backup-class');

		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
