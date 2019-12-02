import path from 'path';
export default {
  /**
   * Return absolute path to the host dir
   * @returns {string} Absolute path to host dir
   **/
  hostRoot() {
    return process.cwd();
  },
  /**
   * Return an absolute path to a file at the root
   * @param {string} relativePath Relative path from the root
   * @returns {string} Absolute path to the file
   **/
  hostPath(relativePath = '') {
    return path.resolve(this.hostRoot(), relativePath);
  },
  /**
   * Return absolute path to the aberlaas directory
   * @returns {string} Absolute path to aberlaas dir
   **/
  sovRoot() {
    return path.resolve(__dirname, '..');
  },
  /**
   * Return an absolute path to a file in the aberlaas directory
   * @param {string} relativePath Relative path from the aberlaas root
   * @returns {string} Absolute path to the aberlaas file
   **/
  sovPath(relativePath = '') {
    return path.resolve(this.sovRoot(), relativePath);
  },
};
