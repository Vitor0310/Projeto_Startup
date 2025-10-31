module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Você PODE ter a linha de plugins aqui, se adicionou o Reanimated antes:
    plugins: ['react-native-reanimated/plugin'], 
  };
};