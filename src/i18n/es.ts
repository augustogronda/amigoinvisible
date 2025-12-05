export const es = {
  language: {
    flag: "🇦🇷",
    name: "Español",
  },
  errors: {
    needMoreParticipants: "¡Se necesitan al menos 2 participantes!",
    invalidPairs: "No se pudieron generar parejas válidas con las reglas actuales. Por favor, revisa las reglas e inténtalo de nuevo.",
    multipleMustRules: "Se encontraron múltiples reglas de OBLIGACIÓN",
    conflictingRules: "Uso conflictivo de una regla de OBLIGACIÓN y PROHIBICIÓN",
    emptyName: "Nombre vacío",
    duplicateName: "Nombre duplicado: {{name}}",
    invalidRuleFormat: "Formato de regla inválido: {{rule}}",
    unknownParticipant: "Participante desconocido en la regla: {{name}}",
    noValidReceivers: "No quedan receptores válidos para este participante",
    line: "Línea {{number}}"
  },
  home: {
    vanity: "",
    sponsor: "",
    title: "Navidad Family Group",
    explanation: [
      "¡Bienvenido! Esta herramienta te ayudará a organizar el intercambio de regalos. Simplemente lista a todos los participantes y asignaremos las parejas al azar según las reglas que establezcas.",
      "Recibirás un enlace único para cada participante, que tendrás que compartir tú mismo (por WhatsApp, email, etc). [<exampleLink>Enlace de ejemplo</exampleLink>]",
      "¡Sin cuentas, sin correos, sin complicaciones!",
    ].map(line => `<p>${line}</p>`).join(''),
    exampleLink: "Enlace de ejemplo",
  },
  pairing: {
    title: "Tu Asignación del Amigo Invisible",
    assignment: "¡Hola, <name/>! Te ha tocado regalar a:",
    loading: "Cargando...",
    error: "No se pudo descifrar el mensaje. El enlace podría ser inválido.",
    startYourOwn: "¡Organiza tu propio Amigo Invisible!"
  },
  participants: {
    title: "Participantes",
    generationWarning: "Importante: Cualquier cambio en la lista de participantes o configuración requerirá crear nuevas parejas. Los enlaces existentes no se modificarán retroactivamente.",
    addPerson: "Agregar Persona",
    generatePairs: "Generar Parejas",
    enterName: "Ingresa el nombre del participante",
    editRules: "Editar reglas",
    removeParticipant: "Eliminar participante",
    rulesCount_one: "{{count}} regla establecida",
    rulesCount_other: "{{count}} reglas establecidas",
    switchToFormView: "Cambiar a vista de formulario",
    switchToTextView: "Cambiar a vista de texto"
  },
  rules: {
    title: "Reglas para {{name}}",
    mustBePairedWith: "Debe regalar a",
    mustNotBePairedWith: "No debe regalar a",
    selectParticipant: "Seleccionar otro participante",
    removeRule: "Eliminar regla",
    addMustRule: "Forzar una Pareja",
    addMustNotRule: "Evitar una Pareja",
    cancel: "Cancelar",
    saveRules: "Guardar Reglas",
    hintLabel: 'Sugerencia de Regalo',
    hintPlaceholder: 'Ingresa una sugerencia sobre preferencias de regalo (opcional)',
  },
  links: {
    title: "Enlaces para Compartir",
    warningParticipantsChanged: "Advertencia: Los participantes o reglas han cambiado desde la última vez que se generaron estos enlaces.",
    resetAssignments: "Regenerar Parejas",
    shareInstructions: "Comparte estos enlaces solo con quien hace el regalo correspondiente",
    exportCSV: "Exportar como CSV",
    copySecretLink: "Copiar Enlace Secreto",
    linkCopied: "¡Copiado al portapapeles!",
    for: "para"
  },
  settings: {
    title: "Configuración",
    instructions: "Instrucciones Adicionales",
    instructionsPlaceholder: "ej., presupuesto, fecha, lugar...",
    instructionsHelp: "Se mostrarán a todos los participantes en su página de asignación. Mantenlo breve: aumenta la longitud de los enlaces."
  },
}; 
