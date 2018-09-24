from io import BytesIO
import cairosvg


def convert_svg_to_png(svg):
    output = BytesIO()

    cairosvg.svg2png(bytestring=svg, write_to=output)

    output.seek(0)

    return output
