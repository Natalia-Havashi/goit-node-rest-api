const handleSaveError = (error,data,netx) => {
  const {name,code} = error;
  error.status = (name === 'MongoServerError' && code === 11000) ? 409 : 400;
    netx();
}

const addUpdateSettings = function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next()
  };

module.exports = {handleSaveError, addUpdateSettings}