export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "systems/escape/templates"
    "systems/escape/templates/sidebar/sidebar.html"
  ];

  return loadTemplates(templatePaths);
}
