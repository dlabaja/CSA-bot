Discord bot pro ČSA server (https://discord.gg/2gx4BeC2W4)

Jak spustit:
1. Vytvořte si Discord bota a [vygenerujte token](https://discord.com/developers/applications).
2. Zkopírujte **.env.example** v rootu projektu a přejmenujte ho na **.env**, vyplňte token.
3. Zkopírujte **config.example.json** v rootu projektu a přejmenujte ho na **config.json**, vyplňte hodnoty.
4. Stáhněte si [Node.js](https://nodejs.org/en).
5. V rootu projektu jsou dva skripty, oba spustíte příkazem **node [jméno souboru]**
    - **update.js** aktualizuje projekt a přemigruje databázi, jednou za čas doporučuji spustit
    - **run.js** spustí bota
