# Loom walkthrough for Insta Biz Web

Aim for about four minutes. Use Loom screen share with your own voice, and open the site, the repository, and your terminal before recording. Use test details for the enquiry and stop after the draft appears.

| Time | Show on screen | Explain in your own words |
| --- | --- | --- |
| 0:00–0:25 | Deployed homepage and a narrow viewport | “Hi, I’m Muhammed Hammad S. This is my technical assignment for Insta Biz Web. I’ll demonstrate the TeddyPups site and then show how it’s built.” |
| 0:25–1:20 | Puppies → Korean Teacup and Girls → clear → Max’s profile | “The catalog contains 15 available puppies. Filters combine across groups and the URL stores the selection. A profile renders from the same data as the catalog card. Max’s gallery switches between a photograph and a video.” |
| 1:20–2:00 | Happy families gallery, FAQ and How it works | “The gallery has 64 entries. The lightbox supports arrow keys and Escape. FAQ search checks both the question and the answer. The adoption tabs support click and keyboard navigation.” |
| 2:00–2:35 | Contact form, invalid submission, then a valid draft | “The form validates required fields and prepares an email draft. The visitor can review and send from their own email app. That keeps the public assessment demo independent of the reference site’s submission backend.” |
| 2:35–3:15 | `build.mjs`, `src/data.mjs`, `src/client.js` | “Node generates one HTML page per route. I used shared templates for the header, footer and profiles. Client JavaScript handles interactions, and CSS handles the layout breakpoints. Using static output keeps deployment simple and gives each puppy a direct link.” |
| 3:15–3:45 | AI disclosure below, then the terminal and deployed page | “I used OpenAI Codex to read the brief, inspect the public reference, generate the implementation, and run checks. Here is what I asked it. I can explain the filter state, shared templates and enquiry behavior. The biggest implementation decision was how to reproduce the user journeys with a stand-alone static demo.” |
| 3:45–4:05 | `npm run build`, `npm run check`, live URL | Explain the tests the terminal actually shows. Mention the narrow viewport check and any remaining differences. Finish on the live homepage. |

## AI-use disclosure

- **Tool used** — OpenAI Codex in ChatGPT Work Mode, including its browser and command execution tools.
- **Initial user prompt, verbatim text following the private Gmail link** — “ye email dekho na ye technical round mujhe sahi se finish karnz hai aur tum complete karke doge ok na”
- **Reference brief supplied by the assignment email** — “Build a complete clone of the reference website, matching its design, layout, responsiveness, and functionality as closely as possible.”
- **Publication instruction, verbatim** — “Haan, dono publish karo”
- **How to demonstrate the prompts** — Show the relevant chat lines with the private Gmail link and unrelated account information off screen. Describe any additional prompts you actually use.

## Deployment screen

Show the GitHub repository, the Netlify production deploy, and the live Netlify URL. Explain that Netlify runs the same `npm run build` command and publishes the generated `dist` folder.
