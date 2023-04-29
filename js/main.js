'use strict';
import Projects from './projects.js';
import Experiences from './experiences.js';
import NavigationBar from './navigation-bar.js'

const projects = new Projects();
projects.render();

const experiences = new Experiences();
experiences.render();

const navigationBar = new NavigationBar();