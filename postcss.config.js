// postcss-scss – парсит конструкции scss, чтобы следующие плагины могли преобразовать scss в css
// precss – парсит переменные, условные выражения и итераторы из scss
// postcss-nested – раскрывает вложенные селекторы
// postcss-cli – пакет для работы с postcss из командной строки
// postcss-import – раскрытие import в scss
module.exports = {
  syntax: 'postcss-scss',
  map: {
    inline: true
  },
  plugins: [
    require('precss')({
      lookup: {
        disable: true
      },
      properties: {
        // Чтобы работали CSS custom properties, а не заменялись на статическое значение.
        disable: true,
        preserve: true,
      },
    }),
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano'),
  ],
}
