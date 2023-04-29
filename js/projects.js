'use strict';

export default class Projects {
  _projects = [
    {
      id: 1,
      title: 'AI Player',
      img: './img/projects/eda-game.png',
      alt: "Preview of a round's game.",
      description:
        'Developed an AI player for a game tournament held by the Data Structures and Algorithms class at UPC that got into the finals out of 242 players.',
      url: 'https://github.com/jianingxu1/EDA-game',
      technologies: ['C++'],
    },
    {
      id: 2,
      title: 'jianingxu.me',
      img: './img/projects/jianingxu-me.png',
      alt: "Preview of the project's website.",
      description:
        'Developed a fully responsive personal website from scratch using HTML, CSS (Bootstrap) and JavaScript.',
      url: 'https://github.com/jianingxu1/jianingxu.me',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    },
    {
      id: 3,
      title: 'Tennis Circuit Manager',
      img: './img/projects/tennis-circuit-manager.png',
      alt: 'The output of the tennis circuit manager program given a sample input.',
      description: 'Created a program that manages a Tennis Circuit using C++.',
      url: 'https://github.com/jianingxu1/practicaPRO2',
      technologies: ['C++'],
    }
  ];

  _getProjectsHtml(projects) {
    const projectToHtmlCard = project => {
      const getHtmlList = (acc, elem) => {
        return acc + `<li>${elem}</li>`;
      }
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
  };

  render() {
    const projectsContainer = document.querySelector('#projects-container');
    projectsContainer.insertAdjacentHTML("afterbegin", this._getProjectsHtml(this._projects));
  };
}