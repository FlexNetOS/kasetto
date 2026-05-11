#!/usr/bin/env fish
#
# Hybrid demo runner — scripts the terminal side deterministically so
# Screen Studio (or any screen recorder) only has to capture one take.
#
# Mirrors the beats from assets/hero.tape but runs in a real terminal
# at native speed, with a faked typing animation for the command lines.
#
# Usage:
#   1. Resize your terminal to roughly 1280x800 with font size 18–22pt.
#      Recommended: Ghostty / WezTerm / Warp, single-character prompt,
#      Berkeley Mono or Geist Mono.
#   2. Start Screen Studio recording (or your tool of choice).
#   3. Run:  just demo-record   (or: fish assets/scripts/demo-record.fish)
#   4. Stop recording when the final `kst list --plain` output rests.
#   5. In Screen Studio, trim the head/tail and let it auto-zoom.
#
# Pre-reqs:
#   - kst on PATH       (cargo install --path .)
#   - bat               (brew install bat)
#   - curl, mktemp      (default on macOS)

set -l CONFIG_URL https://raw.githubusercontent.com/pivoshenko/pivoshenko.ai/main/kasetto.yaml

# --- Helpers --------------------------------------------------------------

# Print text one character at a time, simulating typing. Tunable speed.
function _type --argument-names text
    for char in (string split '' -- $text)
        printf %s $char
        sleep 0.07
    end
end

# Render a fake prompt + typed command, pause, then execute it.
function _run --argument-names cmd
    set_color brblack; printf '❯ '; set_color normal
    _type $cmd
    sleep 0.4
    echo
    eval $cmd
end

# Beat separator: pause on the result, then clear for the next beat.
function _beat_end --argument-names pause
    sleep $pause
    clear
    sleep 0.3
end

# --- Setup (run before the recording starts capturing the "real" demo) ----

set -l stage (mktemp -d)
function _cleanup --on-event fish_exit
    rm -rf $stage
end

curl -fsSL $CONFIG_URL -o $stage/kasetto.yaml
or begin
    echo "Failed to fetch demo config from $CONFIG_URL" >&2
    exit 1
end

cd $stage
clear

# Give the recorder a moment to settle on a clean frame before Beat 1.
sleep 1

# --- Beat 1: reveal the config -------------------------------------------
# Density is the message — let it scroll, let viewers see the surface area.

_run "bat kasetto.yaml"
_beat_end 4

# --- Beat 2: the magic ----------------------------------------------------
# One command. Streaming installs across multiple sources and agents.

_run "kst sync"
_beat_end 2

# --- Beat 3: the payoff (loop / final frame) -----------------------------
# --plain prints a static listing — better hold frame than the animated TUI.

_run "kst list --plain"

# Hold on the populated listing so the recording has a clean stopping point
# and (if you ever export as a loop) a coherent final frame.
sleep 8
