import * as vscode from 'vscode';
import * as path from 'path';
import { SoundPlayer } from './player';

// ─── State ──────────────────────────────────────────────────────────────────────
let player: SoundPlayer;
let statusBarItem: vscode.StatusBarItem;
let lastPlayTime: number = 0;
let isEnabled: boolean = true;
let previousErrorUris: Map<string, number> = new Map(); // URI -> error count

// ─── Activation ─────────────────────────────────────────────────────────────────
export function activate(context: vscode.ExtensionContext) {
    console.log('[Fahhh] Extension activated! 🔊');

    // Initialize sound player with the bundled sound file
    const soundPath = path.join(context.extensionPath, 'media', 'fahhh.mp3');
    player = new SoundPlayer(soundPath);

    // Read initial config
    const config = vscode.workspace.getConfiguration('fahhhErrorSound');
    isEnabled = config.get<boolean>('enabled', true);

    // ── Status Bar ────────────────────────────────────────────────────────────
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.command = 'fahhhErrorSound.toggle';
    updateStatusBar();
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // ── Commands ──────────────────────────────────────────────────────────────
    const toggleCommand = vscode.commands.registerCommand(
        'fahhhErrorSound.toggle',
        () => {
            isEnabled = !isEnabled;
            updateStatusBar();
            vscode.window.showInformationMessage(
                isEnabled
                    ? 'Fahhh Error Sound: ENABLED 🔊'
                    : 'Fahhh Error Sound: DISABLED 🔇'
            );
        }
    );

    const testCommand = vscode.commands.registerCommand(
        'fahhhErrorSound.testSound',
        () => {
            vscode.window.showInformationMessage('Playing FAHHH sound... 🔊');
            player.play().catch((err) =>
                console.error('[Fahhh] Test play error:', err)
            );
        }
    );

    context.subscriptions.push(toggleCommand, testCommand);

    // ── Snapshot current diagnostics (so we don't trigger on existing errors) ─
    snapshotCurrentDiagnostics();

    // ── Code Error Detection ──────────────────────────────────────────────────
    const diagnosticListener = vscode.languages.onDidChangeDiagnostics(
        (event: vscode.DiagnosticChangeEvent) => {
            const cfg = vscode.workspace.getConfiguration('fahhhErrorSound');
            if (!isEnabled || !cfg.get<boolean>('detectCodeErrors', true)) {
                return;
            }

            for (const uri of event.uris) {
                const diagnostics = vscode.languages.getDiagnostics(uri);
                const currentErrorCount = diagnostics.filter(
                    (d) => d.severity === vscode.DiagnosticSeverity.Error
                ).length;

                const previousCount = previousErrorUris.get(uri.toString()) || 0;

                // Only play if NEW errors appeared (count increased)
                if (currentErrorCount > previousCount) {
                    playWithCooldown();
                }

                // Update the snapshot
                if (currentErrorCount > 0) {
                    previousErrorUris.set(uri.toString(), currentErrorCount);
                } else {
                    previousErrorUris.delete(uri.toString());
                }
            }
        }
    );
    context.subscriptions.push(diagnosticListener);

    // ── Terminal Error Detection (Shell Integration API — stable since 1.93) ──
    // Fires when a terminal command finishes execution.
    // We check the exit code: non-zero means the command failed.
    if (vscode.window.onDidEndTerminalShellExecution) {
        const terminalListener = vscode.window.onDidEndTerminalShellExecution(
            (event: vscode.TerminalShellExecutionEndEvent) => {
                const cfg = vscode.workspace.getConfiguration('fahhhErrorSound');
                if (
                    !isEnabled ||
                    !cfg.get<boolean>('detectTerminalErrors', true)
                ) {
                    return;
                }

                // exitCode !== 0 means the command failed
                if (event.exitCode !== undefined && event.exitCode !== 0) {
                    playWithCooldown();
                }
            }
        );
        context.subscriptions.push(terminalListener);
    } else {
        console.warn(
            '[Fahhh] Shell Integration API not available. Terminal error detection disabled. Upgrade VS Code to 1.93+.'
        );
    }

    // ── Config Change Listener ────────────────────────────────────────────────
    const configListener = vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('fahhhErrorSound.enabled')) {
            const cfg =
                vscode.workspace.getConfiguration('fahhhErrorSound');
            isEnabled = cfg.get<boolean>('enabled', true);
            updateStatusBar();
        }
    });
    context.subscriptions.push(configListener);
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Snapshot current diagnostics so we don't fire on pre-existing errors
 * when the extension first activates.
 */
function snapshotCurrentDiagnostics(): void {
    const allDiagnostics = vscode.languages.getDiagnostics();
    for (const [uri, diagnostics] of allDiagnostics) {
        const errorCount = diagnostics.filter(
            (d) => d.severity === vscode.DiagnosticSeverity.Error
        ).length;
        if (errorCount > 0) {
            previousErrorUris.set(uri.toString(), errorCount);
        }
    }
}

/**
 * Play the sound if the cooldown period has elapsed.
 */
function playWithCooldown(): void {
    const config = vscode.workspace.getConfiguration('fahhhErrorSound');
    const cooldownMs = config.get<number>('cooldownMs', 3000);
    const now = Date.now();

    if (now - lastPlayTime < cooldownMs) {
        return; // Still in cooldown
    }

    lastPlayTime = now;
    player.play().catch((err) =>
        console.error('[Fahhh] Playback error:', err)
    );
}

/**
 * Update the status bar item to reflect the current state.
 */
function updateStatusBar(): void {
    if (isEnabled) {
        statusBarItem.text = '$(unmute) FAHHH';
        statusBarItem.tooltip = 'Fahhh Error Sound: ON (click to toggle)';
        statusBarItem.backgroundColor = undefined;
    } else {
        statusBarItem.text = '$(mute) FAHHH';
        statusBarItem.tooltip = 'Fahhh Error Sound: OFF (click to toggle)';
        statusBarItem.backgroundColor = new vscode.ThemeColor(
            'statusBarItem.warningBackground'
        );
    }
}

// ─── Deactivation ───────────────────────────────────────────────────────────────
export function deactivate() {
    console.log('[Fahhh] Extension deactivated. Goodbye! 👋');
}
