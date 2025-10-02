Discord bot pro ČSA server (https://discord.gg/2gx4BeC2W4)

Jak spustit:
1. Stáhněte si kód [zde](https://github.com/dlabaja/CSA-bot/archive/refs/heads/master.zip).
2. Vytvořte si Discord bota a [vygenerujte token](https://discord.com/developers/applications).
3. Zkopírujte **.env.example** v rootu projektu a přejmenujte ho na **.env**, vyplňte token.
4. Zkopírujte **config.example.json** v rootu projektu a přejmenujte ho na **config.json**, vyplňte hodnoty.
5. Stáhněte si [Node.js](https://nodejs.org/en).
6. V rootu projektu jsou dva skripty, oba spustíte příkazem **node [jméno souboru]**:
    - **update.js** aktualizuje projekt a přemigruje databázi, jednou za čas doporučuji spustit
    - **run.js** spustí bota
