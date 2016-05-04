import registerXDiv from './registerXDiv';
import xController from './xController';
import xDivTester from './xDivTester';

registerXDiv();

// Expose xController for xDiv modules
window.xController = xController;
window.xDivTester = xDivTester;
