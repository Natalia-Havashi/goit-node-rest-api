const handleSaveError = (error,data,netx) => {
    error.status = 400;
    netx();
}

const addUpdateSettings = function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next()
  };

module.exports = {handleSaveError, addUpdateSettings}