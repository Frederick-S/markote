import cairosvg


def convert_svg_to_png(svg_string, output):
    cairosvg.svg2png(bytestring=svg_string, write_to=output)
