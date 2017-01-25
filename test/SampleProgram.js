class Program {
  start() {
    return this._askForProjectName()
      .then(() => this._createWorkspace())
      .then(() => this._createGateway())
      .then(() => this._createFirstService())
      .then(() => this._end());
  }

  // Private
  _askForProjectName() {
    return this.inquirer.prompt([{
      type: 'input',
      name: 'projectName',
      message: "What's your project's name?",
      validate: (answer) =>  _.isEmpty(answer) ? 'We need a name in order to create a project for you :)' : true
    }]).then((answer) => this.answer = answer );
  }

  _createWorkspace() {
    this.sh.mkdir(this.answer.projectName);
    this.sh.pushd(this.answer.projectName);
  };

  _createGateway() {
    this.gateway.create(this.answer);
  };

  _createFirstService() {
    this.service.create(this.answer);
  };

  _end() {
    this.sh.popd();
  };
};

module.exports = Program;
