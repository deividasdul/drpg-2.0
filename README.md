# DRPG

**DRPG** is a habit tracking web app built with Next.js that takes inspiration from GitHub’s contribution graph. It uses the [Pixela API](https://pixe.la) under the hood to let users create graphs, track their habits as “pixels,” and manage everything with full CRUD functionality — from graphs to individual pixel entries.

The idea is to gamify the typical to-do list or habit tracker. Instead of checking boxes, you “contribute” pixels to your habit graph, making it feel more like a game or a visual streak tracker. Think of it like GitHub contributions, but for anything — reading, working out, coding, etc.

---

## What it does

* Lets users create an account and manage their profile
* Allows full CRUD (Create, Read, Update, Delete) operations for:

  * **Graphs** – e.g. a graph for "Reading" or "Workout"
  * **Pixels** – each one represents progress on a specific day
* Uses Pixela as the backend for storing and visualizing data
* Designed to make habit-tracking visual and motivating

---

## What's planned

This is still a work in progress. Some upcoming features include:

* Integration with **Sheety API** so you can export or display data in spreadsheets
* Weekly email summaries with analytics and streaks
* Possibly more gamified elements like achievements, levels, etc.

---

## Getting started

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/drpg.git
   cd drpg
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file and add the following:

   ```
   NEXT_PUBLIC_PIXELA_USERNAME=your_pixela_username
   NEXT_PUBLIC_PIXELA_TOKEN=your_pixela_token
   ```

   You can also set up placeholders for the upcoming features:

   ```
   EMAIL_SERVICE_API_KEY=your_email_api_key
   SHEETY_API_URL=https://api.sheety.co/...
   ```

4. Run it locally:

   ```bash
   npm run dev
   ```

---

## Why I built this

Most habit trackers feel either too basic or too overwhelming. DRPG aims to strike a balance by using visual feedback (like GitHub's graph) to make daily progress feel more rewarding. It's also an excuse to build something fun with Next.js and experiment with external APIs like Pixela, Sheety, and email services.
