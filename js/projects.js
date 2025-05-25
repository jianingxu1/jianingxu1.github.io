'use strict';

export default class Projects {
  _projects = [
    {
      id: 1,
      title: 'Orbio',
      img: './img/projects/orbio.jpg',
      alt: 'A smartwatch displaying health data',
      description: 'Backend architecture for a platform supporting research studies on smartwatch-based digital biomarkers. Handles 1M+ data points per user daily.',
      url: 'https://github.com/ADAMMA-CDHI-ETH-Zurich/CLAIDDashboard',
      technologies: ['Python', 'Flask', 'PostgreSQL', 'Docker'],
    },
    {
      id: 2,
      title: 'Hands-Free',
      img: './img/projects/hands-free.jpg',
      alt: 'A warehouse worker using voice commands',
      description: 'Voice-controlled assistant for warehouse workers with 90%+ recognition accuracy. Won 1st Place at HackUPC 2024.',
      url: 'https://github.com/jianingxu1/hands-free-hackupc-2024',
      technologies: ['Python', 'Alexa Skills', 'AWS S3'],
    },
    {
      id: 3,
      title: 'LoL SquadScope',
      img: './img/projects/lol-squadscope.png',
      alt: "Preview of squadscope's website.",
      description: 'Follow your favorite LoL eSports team! Keep track of your team\'s upcoming matches, recents matches and more.',
      url: 'https://lol-squadscope-huiyuan.vercel.app',
      technologies: ['React.js', 'Next.js', 'TailwindCSS'],
    },
    {
      id: 4,
      title: 'AI Player',
      img: './img/projects/eda-game.png',
      alt: "Preview of a round's game.",
      description: 'Developed an AI player for "The Walking Dead" game tournament, advancing to the finals out of 242 participants.',
      url: 'https://github.com/jianingxu1/EDA-game',
      technologies: ['C++', 'Algorithms'],
    },
  ];

  _getProjectsHtml(projects) {
    const projectToHtmlCard = (project) => {
      const getHtmlList = (acc, elem) => {
        return acc + `<li>${elem}</li>`;
      };
      const techList = project.technologies.reduce(getHtmlList, '');
      const card = `<a href='${project.url}' target='_blank' rel='noopener noreferrer' class='d-flex align-items-stretch'>
            <div class='card' style='width: 18rem;'>
                <div class='card-body d-flex flex-column'>
                    <div class='project-icons'>
                        <img src='${project.img}' alt='${project.alt}' style='width: 15rem; height: 150px'>
                    </div>
                    <div class='d-flex flex-column justify-content-between h-100'>
                        <div>
                            <h5 class='project-title'>${project.title}</h5>
                            <p class='project-description'>${project.description}</p>
                        </div>
                        <ul class='project-technologies' id='project${project.id}'>
                            ${techList}
                        </ul>
                    </div>
                </div>
            </div>
        </a>`;
      return card;
    };

    return projects.reduce((acc, project) => acc + projectToHtmlCard(project), '');
  }

  render() {
    const projectsContainer = document.querySelector('#projects-container');
    projectsContainer.insertAdjacentHTML('afterbegin', this._getProjectsHtml(this._projects));
  }
}