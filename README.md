# Baseline Value Advisory website

## What's inside

- **index.html**: the home page
- **services.html**: compares all services, with the interactive engagement builder
- **services/**: one page for each service
  - **Engagement steps**
    - **value-maps.html**: Step 1, Product value maps
    - **engineering.html**: Step 2, Value engineering toolkit
    - **enablement.html**: Step 3, Enablement and AI value assistants
  - **Available on its own**
    - **realization.html**: Value realization, the optional Prove step after go live
    - **fractional.html**: Fractional value engineering
    - **ai.html**: AI investment cases
    - **practice.html**: Value practice design
- **approach.html, proof.html, about.html, contact.html**: the other top level pages
- **404.html**: shown when someone follows a broken link
- **assets/styles.css**: every color, font, and layout rule for the whole site
- **assets/site.js**: the Services dropdown, mobile menu, engagement builder, and calculator
- **sitemap.xml and robots.txt**: help search engines find every page

To preview on your computer, open index.html in your browser. A few links, like those on the 404 page, only work once the site is live on your domain.

## Brand colors

All colors are set once at the top of assets/styles.css. Change a value there and it updates across every page.

- **#004561 deep teal**: primary. Headings, buttons, dark panels, footer.
- **#FFD700 gold**: signature highlight. Value lines, buttons on teal, highlighter marks behind key words.
- **#5ED1E0 aqua**: second highlight on teal. Baselines in charts, labels, small accents.
- **#0A8CA1 deep aqua**: the same aqua, darkened so it stays visible on white.

Gold is hard to read as text or thin lines on white, so it only appears on teal or as a thick highlighter mark. The site is light mode only.

## Your photo

Your headshot lives in assets/headshot.jpg (About page) and assets/avatar.jpg (home page). To use a different photo later, replace those two files and keep the same names.

## Publish with GitHub Pages (free)

In the steps below, replace YOUR-USERNAME with your GitHub username.

### 1. Put the site in a GitHub repository

1. On github.com, click **New repository**. Name it something like `baseline-site` and make it **Public**. GitHub Pages is free for public repositories. Private ones need a paid GitHub plan.
2. Add the site files:
   - **In the browser:** on the new repository page, click **uploading an existing file**. Open the baseline_site folder, select everything inside it, drag it onto the page, and click **Commit changes**.
   - **With GitHub Desktop:** clone the repository, copy everything from inside the baseline_site folder into the cloned folder, then commit and push.
3. Check that index.html sits at the top level of the repository, not inside a baseline_site subfolder. If it's inside a subfolder, the site won't load.
4. Don't upload the backup folder.

### 2. Turn on GitHub Pages

1. In the repository, go to **Settings > Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**, the branch to **main**, and the folder to **/ (root)**. Click **Save**.
3. After a minute or two, the site is live at `https://YOUR-USERNAME.github.io/baseline-site/`. Some links only work once the custom domain is connected, so don't worry if a few break at this address.

### 3. Verify the domain with GitHub (do this first)

This stops anyone else from pointing a GitHub site at your domain.

1. Click your profile picture, then **Settings > Pages > Add a domain**.
2. Enter `baselinevalueadvisory.com`. GitHub shows a TXT record to add.
3. In Porkbun, add that TXT record (see the next section for where). In the **Host** field, enter only the part GitHub shows before your domain, such as `_github-pages-challenge-YOUR-USERNAME`. Porkbun adds the domain for you.
4. Back in GitHub, click **Verify**. It can take a few minutes for the record to show up.

### 4. Point the domain from Porkbun

1. Log in to Porkbun, open **Domain Management**, find baselinevalueadvisory.com, and open **DNS**.
2. **Delete Porkbun's default parking records.** These are usually an ALIAS record and a wildcard (`*`) CNAME record, both pointing to `uixie.porkbun.com`.
3. **Leave your email records alone.** Don't touch the MX records or any TXT records for SPF, DKIM, or Google verification. Those keep your Google Workspace email working.
4. Add these records:

| Type | Host | Answer |
|---|---|---|
| A | *(leave blank)* | 185.199.108.153 |
| A | *(leave blank)* | 185.199.109.153 |
| A | *(leave blank)* | 185.199.110.153 |
| A | *(leave blank)* | 185.199.111.153 |
| AAAA | *(leave blank)* | 2606:50c0:8000::153 |
| AAAA | *(leave blank)* | 2606:50c0:8001::153 |
| AAAA | *(leave blank)* | 2606:50c0:8002::153 |
| AAAA | *(leave blank)* | 2606:50c0:8003::153 |
| CNAME | www | YOUR-USERNAME.github.io |

If GitHub's documentation lists different addresses when you set this up, use theirs. Search for "Managing a custom domain for your GitHub Pages site".

### 5. Connect the domain and turn on HTTPS

1. In the repository, go to **Settings > Pages**. Under **Custom domain**, enter `baselinevalueadvisory.com` and click **Save**.
2. GitHub adds a file named `CNAME` to your repository. **Keep that file.** If it gets deleted, the site stops loading at your domain.
3. Once the DNS check passes, tick **Enforce HTTPS**. The security certificate can take up to 24 hours to issue, and DNS changes can take a few hours to spread.
4. Visitors who type www.baselinevalueadvisory.com are sent to the main address automatically.

## Making changes later

- **In the browser:** open the repository, click **Add file > Upload files**, drag in the changed files, and commit. To replace a file, upload one with the same name in the same folder.
- **With GitHub Desktop:** edit the files in your cloned folder, then commit and push.

The live site updates within a few minutes of each commit. If you replace the whole site at once, keep the `CNAME` file in place.

The header and footer repeat on every page, so menu changes have to be made in each file. Find and replace handles that quickly, or ask Claude to update all pages at once.
