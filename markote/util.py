import io
import cairosvg


def convert_svg_to_png(svg):
    output = io.BytesIO()

    cairosvg.svg2png(bytestring=svg, write_to=output)

    output.seek(0)

    return output
