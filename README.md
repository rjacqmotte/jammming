# Jammming

## ce que j'apprends

ce projet est l'occasion de pratiquer et de faire mes premier pas avec react... je partage ici toutes les frictions et les découvertes qui se présente à moi.

### première phase: structure de fichier et premier components en jsx

#### Intro

j'ai commencé le projet il y a quelques heures. je partage ici les difficulté et les aspect que j'ai dû approfondir par moi même. En construisant le projet, des questions sont naturellement venue à moi... avec leurs lots de potentielles solutions.

Pour l'instant j'ai défini la structure de fichiers, défini mes premiers composents et leurs modules css. il n'y a ni usestate ou useeffect... c'est le squelette de base sans aucune logique implantée.

#### Utiliser vite et l'environnement React

C'est pas évident de prendre en main la réalité "vite".

Par rapport à index.html et syle.css dans site statique, je me suis retrouvé dans une constellation de fichier et de dépendences qui me dépasse de loin. Configurer tout cela par moi même n'est pas envisageable pour l'instant.

- Vite permet de tout configurer à ma place;

- vite permet de lancer un serveur pour faire tourner react et affichr le site sur localhost:5173 dans un navigateur;

- vite signale ou sont les erreurs de compilation react;

j'ai compris que:

- je travaille dans la strucutre de dossier "src", j'y construit ma strucutre de dossier pour mon projet;

- si je fais un git, seuelement une partie est "commitée". Comme je travaille sur 2 ordinateurs différents, lorsque j'ai fais un git pull pour la première fois à partir de mon repository distant, j'ai du "ré-installée" les dépendances nécessaires qui ne sont pas récupérée avec git (il y a un .gitignore configuré par défault avec vite). pour cela, je fais `npm instal` dans mon dossier de travail. le système va analyser le fichier json de configuration vite et réinstaller ce qui manque. après cela je peux démarrer le serveur;

- pour démarrer le serveur, je dois faire `npm run dev` dans mon terminale. (je traville dans vs code, j'ai du configurer le terminal de vs code pour l'autorisé via une commande dans powershell, l'ia m'a aider)

#### Bonne pratique de structure de fichier

avec un nombre très grand de fichier au fur et à mesure que je crée des component.jsx et le modules css, j'ai du faire de l'ordre. j'ai fais comme ceci, avec l'aide de l'ia.

mon dossier src mon dossier de travail.

j'ai créer un dossiers component avec un sous dossier pour chaque component et un dossier UI component. les dosssiers component réunissent le .jsx, le module.css et eventuellement les sous-components.

```
src
    components
        myComponent1
            myComponent1.jsx
            myComponent1.module.css
        myComponent2
            ...
        UIComponent
            Button.jsx
            Button.module.css
            Input.jsx
            Input.module.css
    App.jsx
    Index.html
    style.css
    variables.css
    ...
```

#### Structurer le layout général d'une page React - css

Pour les sites statique en HTML et CSS, j'ai l'habitude de faire un containeur principale pour structurer ma page 'layout'. mais avec react, ou mettre ce container? dans qu'elle fichier cela se marque? et quels fichiers css utiliser, comment?

la structure du document est html>body>div.root(point d'injection de l'app)>app.jsx

html, body et div.root se trouve sur index.html

app.jsx est injecter dans le div.root, c'est le lien entre html et jsx.

je crée mon container principale dans app.jsx, comme ceci: div.App\_\_main_container.

##### App.jsx

```jsx
import styles from './App.module.css';
import Header from './components/Header/Header.jsx';
import Menu from './components/Menu/Menu.jsx';
import MainView from './components/MainView/MainView.jsx';
import NavButtons from './components/NavButtons/NavButtons.jsx';
import './variables.css';

function App() {
  return (
    <>
      <div className={styles.App__main_container}>
        <Header />
        <MainView />
        <NavButtons />
      </div>
    </>
  );
}

export default App;
```

##### App.module.css

```css
.App {
  height: 100vh; /* fallback par défaut */
  width: 100vw;
}

@supports (height: 100dvh) {
  .App {
    height: 100dvh; /* utilisé si dispo */
  }
}

.App__main_container {
  height: 100%;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 475px;
  max-height: 900px;
}
```

pour info, il y a aussi un fichier index.css ou je peux directement formater :root, html, body, #root (point d'injection .render).

Aussi, il y a un fichier variables.css lier à :root accessible dans tout les composents.

#### Variable css et react

je crée un fichier variable.css dans src et importer dans App.jsx. c'est accessible à partir de tout mes composents.

##### variables.css

```css
:root {
  --border-radius: 10px;

  --color-black: rgb(30, 29, 28);
  --color-white: rgb(235, 223, 205);
  --color-grey-dark: rgb(90, 90, 90);
  --color-grey-light: rgb(178, 178, 178);

  --color-primary: var(--color-black);
  --color-secondary: var(--color-grey-dark);
  --color-tertary: var(--color-grey-light);
  --color-quartary: rgb(43, 78, 43);

  --color-text: var(--color-white);
  --color-background: var(--color-black);
  --color-button: var(--color-black);
}
```

#### Taille d'écran fixe parfaitement adaptée au smartphone

#### React Components

gros chantier. Au fur et à mesure que je construit la strucutre de l'application, tout devient de plus en plus confus et désordonné. je commence à avoit beaucoup de composant dans tout les sens.

Quand commence un composent ou il se termine? comment savoir si je n'en fais pas trop, ou pas assez? quelles critères employé? comment les nommé?

comment lier et nommer correctement les fichier css?

que faire des tout petits composant comme des boutons? faut-il faire des composant bouton pour chaque type de bouton? est ce que ca vaut le coup de créer des composent pour ces élements? (ca commencent à faire bcp de compo)

##### convention de nom

##### bien définir les composents et leur limite d'action

##### les mini composents UI

#####

####

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
