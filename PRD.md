# Planning Guide

A commute tracking application that helps users monitor their daily bus commute times to and from work, identifying patterns and improving time management.

**Experience Qualities**: 
1. **Effortless** - Recording a commute should take seconds, with minimal friction between arriving and logging
2. **Insightful** - Data visualizations reveal patterns in commute times, helping users make better transit decisions
3. **Reliable** - Consistent, trustworthy data storage that users can depend on for accurate historical records

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused utility with distinct features (logging, viewing history, analytics) that requires persistent state management but avoids complex integrations or account systems.

## Essential Features

### Quick Commute Logger
- **Functionality**: Single-tap recording of commute with direction (to work/from work), departure time, arrival time, and optional notes
- **Purpose**: Minimize friction in daily logging to encourage consistent tracking habits
- **Trigger**: User taps "Log Commute" button on main screen
- **Progression**: Select direction → Auto-capture current time or manually adjust → Add arrival time → Optional notes (bus number, delays, etc.) → Save
- **Success criteria**: Commute logged and stored in under 15 seconds; data persists across sessions

### Commute History View
- **Functionality**: Chronological list of all logged commutes with key details (date, direction, duration, notes)
- **Purpose**: Provide quick reference to past commutes and allow users to spot one-off anomalies
- **Trigger**: User navigates to "History" tab
- **Progression**: View list sorted by date (newest first) → Tap entry to see full details → Option to edit or delete
- **Success criteria**: All commutes display correctly; edit/delete operations work reliably

### Analytics Dashboard
- **Functionality**: Visual statistics showing average commute times, fastest/slowest trips, trends over time
- **Purpose**: Help users understand their commute patterns and plan accordingly
- **Trigger**: User navigates to "Stats" tab
- **Progression**: View summary cards (avg to work, avg from work, total trips) → See chart of commute times over past 30 days → Identify patterns
- **Success criteria**: Statistics calculate correctly; visualizations are clear and meaningful

### Quick Timer Mode
- **Functionality**: Real-time timer that starts when boarding the bus and stops upon arrival
- **Purpose**: Eliminate manual time entry for users actively commuting
- **Trigger**: User taps "Start Trip" button and selects direction
- **Progression**: Select direction → Timer starts → User boards bus → Timer runs → Tap "End Trip" upon arrival → Review and save with optional notes
- **Success criteria**: Timer runs accurately; commute automatically logged with correct duration

## Edge Case Handling

- **No commutes logged yet** - Display empty state with encouraging message and prominent "Log First Commute" call-to-action
- **Timer accidentally closed** - Persist timer state so it continues if user navigates away or refreshes
- **Invalid time entries** - Validate that arrival time is after departure time; show helpful error message
- **Missing data in analytics** - Show "Not enough data" message when fewer than 3 commutes logged
- **Very long commute times** - Handle edge cases where user forgets to stop timer (prompt confirmation for trips >3 hours)

## Design Direction

The design should feel efficient and transit-themed, evoking the reliability of a well-run public transportation system with clean, minimalist interface elements that prioritize speed of use. A rich interface with data visualizations serves the analytical purpose while maintaining clarity.

## Color Selection

Triadic color scheme inspired by urban transit systems - using blue (trust, efficiency), amber (caution/timing), and green (success/completion) to create a balanced, energetic palette that feels both professional and approachable.

- **Primary Color**: Deep Transit Blue (oklch(0.45 0.15 250)) - Communicates reliability and efficiency, represents the bus system
- **Secondary Colors**: 
  - Soft Gray (oklch(0.96 0.005 250)) for subtle backgrounds
  - Charcoal (oklch(0.35 0.01 250)) for secondary text and less prominent UI elements
- **Accent Color**: Amber Alert (oklch(0.75 0.15 75)) - Highlights active timers and important time-sensitive actions like "Start Trip"
- **Foreground/Background Pairings**:
  - Background (White oklch(1 0 0)): Deep Blue text (oklch(0.25 0.1 250)) - Ratio 9.2:1 ✓
  - Card (Soft Gray oklch(0.96 0.005 250)): Deep Blue text (oklch(0.25 0.1 250)) - Ratio 8.5:1 ✓
  - Primary (Deep Transit Blue oklch(0.45 0.15 250)): White text (oklch(1 0 0)) - Ratio 6.8:1 ✓
  - Secondary (Light Blue oklch(0.92 0.03 250)): Deep Blue text (oklch(0.25 0.1 250)) - Ratio 8.1:1 ✓
  - Accent (Amber Alert oklch(0.75 0.15 75)): Deep Blue text (oklch(0.25 0.1 250)) - Ratio 6.2:1 ✓
  - Muted (Silver oklch(0.88 0.01 250)): Charcoal text (oklch(0.45 0.01 250)) - Ratio 5.2:1 ✓

## Font Selection

Typography should convey clarity and precision, reflecting the time-sensitive nature of commute tracking with a modern sans-serif that feels both technical and friendly. Inter provides excellent legibility at all sizes and includes tabular numerals perfect for displaying times and statistics.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold/32px/tight letter-spacing (-0.02em)
  - H2 (Section Headers): Inter SemiBold/24px/normal letter-spacing
  - H3 (Card Titles): Inter Medium/18px/normal letter-spacing
  - Body (General Text): Inter Regular/16px/relaxed line-height (1.6)
  - Small (Metadata): Inter Regular/14px/normal letter-spacing, muted color
  - Time Display (Timer/Duration): Inter SemiBold/40px/tabular-nums, tight spacing

## Animations

Animations should feel snappy and purposeful, reflecting the quick pace of catching a bus while providing satisfying feedback for completed actions. Subtle motion guides attention without delaying task completion.

- **Purposeful Meaning**: Timer pulsing communicates active tracking; success checkmarks celebrate logged commutes; chart bars animate on load to reveal data progressively
- **Hierarchy of Movement**: 
  - Critical: Timer start/stop gets immediate, prominent feedback animation
  - Important: New commute cards slide into the history list
  - Subtle: Stats counter animations when dashboard loads, hover states on interactive elements

## Component Selection

- **Components**: 
  - Card for commute entries and stat summaries with shadow depth for hierarchy
  - Tabs for navigation between Logger/History/Stats sections
  - Dialog for commute entry form with validation
  - Button variants (primary for "Start Trip", secondary for "Cancel", ghost for list actions)
  - Badge for direction labels (To Work/From Work) with color coding
  - Separator for visual section breaks
  - ScrollArea for history list
  - Sheet for mobile-friendly commute details view
  
- **Customizations**: 
  - Large circular timer display component with animated progress ring
  - Duration badge component showing formatted time (e.g., "28 min")
  - Simple bar chart component using div heights for commute time visualization
  - Empty state illustrations for each tab
  
- **States**: 
  - Buttons: Default has subtle shadow, hover lifts slightly, active scales down, disabled reduces opacity and removes pointer
  - Timer button: Pulsing border when active, color shift from green (start) to red (stop)
  - Form inputs: Subtle focus ring in primary color, error state with red border and icon
  - Cards: Hover reveals action buttons (edit/delete), selected state for viewing details
  
- **Icon Selection**: 
  - Bus (for main logo and empty states)
  - ArrowRight/ArrowLeft (for direction indicators)
  - Play/Stop (for timer controls)
  - Clock (for time displays)
  - ChartBar (for analytics tab)
  - Plus (for adding new commute)
  - Pencil/Trash (for edit/delete actions)
  - CalendarBlank (for date selection)
  
- **Spacing**: 
  - Container padding: p-6 on desktop, p-4 on mobile
  - Card internal spacing: p-6
  - Gap between cards: gap-4
  - Gap within card content: gap-3
  - Button padding: px-6 py-3 for primary, px-4 py-2 for secondary
  
- **Mobile**: 
  - Tabs switch to bottom navigation bar on mobile (<768px)
  - Timer display scales down proportionally while maintaining readability
  - Cards stack vertically with full width
  - Sheet component replaces Dialog for commute entry on mobile
  - Floating action button for quick commute logging on mobile
  - Reduce padding to p-4 globally, cards to p-4
  - Statistics display as scrollable horizontal cards instead of grid
