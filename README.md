# United Construction Services Inc Website

Static demonstration website for United Construction Services Inc. The project
uses only HTML, CSS, and vanilla JavaScript. It has no package dependencies or
build step.

## Run Locally

Use either option from the project root:

1. Open the folder in VS Code, install the Live Server extension, and choose
   **Open with Live Server** on `index.html`.
2. Run:

   ```sh
   python3 -m http.server 4173
   ```

   Then open `http://localhost:4173`.

The site must be served through a local web server because JavaScript loads each
section from its own markup fragment.

Section markup uses the `.fragment` extension so VS Code Live Server does not
inject its reload script into dynamically loaded markup.

## Structure

```text
assets/images/   Website image assets
scripts/         Shared JavaScript and section loader
sections/        Section-specific markup, CSS, and JavaScript
styles/          Shared styles and responsive rules
index.html       Main document shell
robots.txt       Search crawler instructions
```

## Demonstration Notice

This is a sales demonstration website created using publicly available business
directory information. It is not the official live website for United
Construction Services Inc.

The "UCS" typographic mark is a temporary demonstration brand mark. Before
publishing, the business owner should provide an approved logo, project photos,
confirmed services, contact details, and service areas.

Representative construction images are sourced from Unsplash and do not depict
confirmed United Construction Services Inc projects.
