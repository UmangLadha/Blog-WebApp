import { exec } from 'child_process';
import * as path from 'path';
import * as os from 'os';

/**
 * Cross-platform sound player using OS-native audio tools.
 * No external npm dependencies required!
 */
export class SoundPlayer {
    private soundPath: string;
    private isPlaying: boolean = false;

    constructor(soundPath: string) {
        this.soundPath = soundPath;
    }

    /**
     * Play the sound file using the appropriate OS command.
     * Returns a promise that resolves when playback completes.
     */
    play(): Promise<void> {
        if (this.isPlaying) {
            return Promise.resolve();
        }

        this.isPlaying = true;

        return new Promise<void>((resolve, reject) => {
            const platform = os.platform();
            let command: string;

            switch (platform) {
                case 'win32':
                    // Use PowerShell's built-in media player on Windows
                    const escapedPath = this.soundPath.replace(/'/g, "''");
                    command = `powershell -NoProfile -Command "(New-Object Media.SoundPlayer '${escapedPath}').PlaySync()"`;
                    break;
                case 'darwin':
                    // macOS has afplay built-in
                    command = `afplay "${this.soundPath}"`;
                    break;
                case 'linux':
                    // Try paplay (PulseAudio) first, fallback to aplay (ALSA)
                    command = `paplay "${this.soundPath}" 2>/dev/null || aplay "${this.soundPath}"`;
                    break;
                default:
                    this.isPlaying = false;
                    reject(new Error(`Unsupported platform: ${platform}`));
                    return;
            }

            exec(command, (error) => {
                this.isPlaying = false;
                if (error) {
                    // Don't reject on playback errors — just log and continue
                    console.warn(`[Fahhh] Sound playback error: ${error.message}`);
                    resolve();
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Update the sound file path (for when users want to use a custom sound).
     */
    setSoundPath(newPath: string): void {
        this.soundPath = newPath;
    }
}
