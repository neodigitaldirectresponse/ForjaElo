const templates = {
  lai: 'SSA, formate este pedido LAI em 5 itens (órgão, assunto, pergunta objetiva, base legal, prazo). Texto: ‹%s›.',
  relatorio: 'SSA, gere P&L e resumo de KPIs com meus números; destaque pendências. Texto: ‹%s›.',
  ata: 'SSA, estruture em: presentes, pauta, falas objetivas, compromissos, prazos, anexos. Texto: ‹%s›.',
  revise: 'Reescreva usando apenas o meu material: ‹%s›.'
};

chrome.runtime.onInstalled.addListener(() => {
  for (const [id, template] of Object.entries(templates)) {
    chrome.contextMenus.create({
      id,
      title: `SSA 6.7: ${id}`,
      contexts: ['selection']
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const template = templates[info.menuItemId];
  if (!template || !info.selectionText) return;
  const text = template.replace('%s', info.selectionText);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (t) => console.log(t),
    args: [text]
  });
});
