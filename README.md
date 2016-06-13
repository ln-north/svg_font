svg font
====

## Description:
SVGとJSでフォントを作るテスト。以下の記事にて公開しました。
[SVGでプロブラマブルなフォントを作る話 - Dwango Creators' blog](http://creator.dwango.co.jp/8741.html)

## Sample:
- Sample1 / Adjustable Font
- Sample2 / Interactive Font 1 (for PC)
- Sample3 / Interactive Font 2 (for SmartPhone with axis sensor

## Usage
- グリフ情報はjs/glyph.jsで定義しています。すべての文字が完成しているわけではないので、文字を作った方はぜひPull Requestを下さい。
- 文字の太さ、アセンダ・ディセンダの高さなどはjs/config.jsで定義しています。
- 文字の描画はjs/display.jsで定義しています。
基本的には、draw_glyphs関数に表示する文字列と、描画する領域であるdomを引数として描画します。
js/config.js内のconfigオブジェクトの値を更新して再描画するときはupdate_glyphs関数を用います。引数はdraw_glyphs関数と同一です。

## Other
- ほとんどJavaScriptやSVGを書いたことがなかったので、下手なコードがたくさんあるかと思いますが、ぜひIssueやPull Requestなどで指摘して下さい!!
