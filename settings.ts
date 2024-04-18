import { App, PluginSettingTab, Setting, TextComponent } from "obsidian";
import Main from "./main";

export interface MainSettings {
	username: string;
	accessToken: string;
}

export const DEFAULT_SETTINGS: MainSettings = {
	username: '',
	accessToken: ''
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: Main;

	constructor(app: App, plugin: Main) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		this.setSettings(containerEl);
	}

	private setSettings(containerEl: HTMLElement): void {
		this.setAccessTokenSetting(containerEl);
		this.setUserNameSetting(containerEl);
	}

	private setAccessTokenSetting(containerEl: HTMLElement): void {
		const description: DocumentFragment = new DocumentFragment();
		const descriptionHtml: HTMLDivElement = document.createElement("div");
		descriptionHtml.innerHTML = `How to get a personal access token, see <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">here</a>`;
		description.append(descriptionHtml);

		new Setting(containerEl)
			.setName('Access token')
			.setDesc(description)
			.addText((text: TextComponent) => text
				.setPlaceholder('Enter your access token')
				.setValue(this.plugin.settings.accessToken)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.accessToken = value;
					await this.plugin.saveSettings();
				}));
	}

	private setUserNameSetting(containerEl: HTMLElement): void {
		new Setting(containerEl)
			.setName('Username')
			.setDesc('Enter your GitHub username')
			.addText((text: TextComponent) => text
				.setPlaceholder('Enter your username')
				.setValue(this.plugin.settings.username)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.username = value;
					await this.plugin.saveSettings();
				}));
	}
}
