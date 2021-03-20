export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "systems/escape/templates"
  ];

  return loadTemplates(templatePaths);
}
