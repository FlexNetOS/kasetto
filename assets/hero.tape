# Kasetto demo tape — render with `just demo-vhs` (which stages a temp dir
# containing the live kasetto.yaml from pivoshenko/pivoshenko.ai).
#
# Narrative: one config -> one command -> a fully provisioned environment.
#   Beat 1 (reveal):  bat ...           "look what's declared in this one file"
#   Beat 2 (magic):   kst sync          "one command, everything installed"
#   Beat 3 (payoff):  kst list --plain  "here's the environment I just got"
# Loops on the populated `kst list` output — the resting frame someone
# scrolling past the README will see. `--plain` is used to keep the frame
# static (the TUI list browser redraws ~8x/sec for animations, which
# captures as flicker in a gif).

Output hero.gif

Set Shell        "fish"
Set FontSize     14
Set Width        1100
Set Height       680
Set Padding      24
Set Theme        "TokyoNight"
Set TypingSpeed  70ms
Set Framerate    60

# Beat 1 — reveal the config. Let it scroll: the density is the message.
Type "bat kasetto.yaml"
Sleep 250ms
Enter
Sleep 4500ms
Type "clear"
Enter
Sleep 250ms

# Beat 2 — the magic. One command, streaming installs across sources & agents.
Type "kst sync"
Sleep 250ms
Enter
Sleep 16s
Type "clear"
Enter
Sleep 250ms

# Beat 3 — the payoff. Static listing of everything that was installed;
# hold on the final frame — this is what loops.
Type "kst list --plain"
Sleep 250ms
Enter
Sleep 5s
