use std::io::{stdout, Stdout};

use crossterm::cursor::{Hide, MoveTo, Show};
use crossterm::execute;
use crossterm::style::{Print, ResetColor, SetForegroundColor};
use crossterm::terminal::{
    disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen,
};

use crate::banner::{banner_lines, banner_width, subtitle_column, subtitle_text, SUBTITLE_ROW};
use crate::colors::term;
use crate::error::Result;

/// RAII guard that enters the alternate screen and restores on drop.
pub(crate) struct TuiGuard {
    pub stdout: Stdout,
}

impl TuiGuard {
    pub(crate) fn enter() -> Result<Self> {
        let mut stdout = stdout();
        enable_raw_mode()?;
        execute!(stdout, EnterAlternateScreen, Hide)?;
        Ok(Self { stdout })
    }
}

impl Drop for TuiGuard {
    fn drop(&mut self) {
        let _ = disable_raw_mode();
        let _ = execute!(self.stdout, Show, LeaveAlternateScreen);
    }
}

/// Draw the ASCII banner starting at `top`. Returns the number of rows consumed (including spacing).
pub(crate) fn draw_banner(stdout: &mut Stdout, top: usize) -> Result<usize> {
    let lines = banner_lines();
    for (offset, line) in lines.iter().enumerate() {
        execute!(
            stdout,
            MoveTo(0, (top + offset) as u16),
            SetForegroundColor(term::BANNER),
            Print(line),
            ResetColor
        )?;
    }
    execute!(
        stdout,
        MoveTo(subtitle_column(), (top + SUBTITLE_ROW) as u16),
        SetForegroundColor(term::ACCENT_WARM),
        Print(subtitle_text()),
        ResetColor
    )?;
    Ok(lines.len() + 1)
}

/// Draw the ASCII banner if the terminal is wide/tall enough, otherwise a compact title.
/// Returns the next row below the banner.
pub(crate) fn draw_banner_or_fallback(
    stdout: &mut Stdout,
    title: &str,
    width: usize,
    height: usize,
    top: u16,
) -> Result<u16> {
    if width >= banner_width() && height >= 18 {
        let row = draw_banner(stdout, top as usize)? as u16;
        Ok(row)
    } else {
        execute!(
            stdout,
            MoveTo(0, top),
            SetForegroundColor(term::ACCENT),
            Print(title),
            ResetColor
        )?;
        Ok(top.saturating_add(2))
    }
}
