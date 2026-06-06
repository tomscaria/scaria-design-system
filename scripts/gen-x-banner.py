#!/usr/bin/env python3
"""
Generate Lore X/Twitter banners (1500x500), no type.
A "halfway point" between lore-light (warm parchment + chartreuse, organic flow)
and revenant (near-black + signal-orange, sharp registration marks + grid).

Chartreuse is the through-line that matches the chartreuse profile avatar.
Outputs SVG + (if rsvg-convert present) PNG into assets/brand/.
"""
import math, subprocess, shutil, os

W, H = 1500, 500
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "brand")

# ---- brand tokens ----
PARCHMENT   = "#F1ECE0"
PARCH_DIM   = "#E5DFD0"
CHART       = "#D4F24B"   # bright chartreuse (on dark)
CHART_MID   = "#9BBD1C"
CHART_DEEP  = "#56730D"   # legible chartreuse on light
GRAPHITE    = "#141613"
NEARBLACK   = "#0E0F0C"
DARKER      = "#08090A"
CONCRETE    = "#F1EEEB"
SIGNAL      = "#FF4F00"   # revenant signal orange
SAGE        = "#D3E0BC"   # avatar background tint


def catmull_rom(points, k=1.0):
    """Smooth path through points via Catmull-Rom -> cubic Bezier."""
    if len(points) < 2:
        return ""
    p = [points[0]] + list(points) + [points[-1]]
    d = f"M {p[1][0]:.1f},{p[1][1]:.1f} "
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i-1], p[i], p[i+1], p[i+2]
        c1 = (p1[0] + (p2[0]-p0[0]) / 6.0 * k, p1[1] + (p2[1]-p0[1]) / 6.0 * k)
        c2 = (p2[0] - (p3[0]-p1[0]) / 6.0 * k, p2[1] - (p3[1]-p1[1]) / 6.0 * k)
        d += f"C {c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f} "
    return d


def flow_path(baseline, amp, wavelen, phase, tilt):
    pts = []
    x = -80
    while x <= W + 80:
        t = x / wavelen * 2 * math.pi + phase
        y = baseline + math.sin(t) * amp + (x / W) * tilt
        pts.append((x, y))
        x += 60
    return catmull_rom(pts)


def header():
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'


def reg_mark(x, y, color, size=12):
    return f'<rect x="{x-size/2:.0f}" y="{y-size/2:.0f}" width="{size}" height="{size}" fill="{color}"/>'


def crosshair(x, y, color, r=9, sw=1.6):
    return (f'<g stroke="{color}" stroke-width="{sw}">'
            f'<line x1="{x-r}" y1="{y}" x2="{x+r}" y2="{y}"/>'
            f'<line x1="{x}" y1="{y-r}" x2="{x}" y2="{y+r}"/></g>')


# ===================================================================
# DIRECTION A — "Dawn Bridge": warm chartreuse light bloom lower-left
# bleeding into a near-black revenant field. Flow lines shift tone
# deep->bright as the surface goes light->dark.
# ===================================================================
def direction_dawn():
    s = [header()]
    s.append('<defs>')
    # base field — warm chartreuse-tinted dark at the (light) left, near-black at the (revenant) right
    s.append(f'''<linearGradient id="field" x1="0" y1="0" x2="1" y2="0.28">
      <stop offset="0" stop-color="#33361F"/>
      <stop offset="0.22" stop-color="#202413"/>
      <stop offset="0.48" stop-color="#101108"/>
      <stop offset="1" stop-color="{DARKER}"/></linearGradient>''')
    # chartreuse dawn — a SATURATED golden-green glow (not white) lower-left, behind the
    # avatar, echoing the sage-chartreuse profile picture. Tight so it reads as light, not haze.
    s.append(f'''<radialGradient id="bloom" cx="0.14" cy="0.76" r="0.72">
      <stop offset="0" stop-color="#DCEAA0" stop-opacity="0.52"/>
      <stop offset="0.20" stop-color="{SAGE}" stop-opacity="0.46"/>
      <stop offset="0.40" stop-color="{CHART}" stop-opacity="0.28"/>
      <stop offset="0.64" stop-color="{CHART}" stop-opacity="0.08"/>
      <stop offset="0.86" stop-color="{CHART}" stop-opacity="0"/></radialGradient>''')
    # chartreuse haze high-left
    s.append(f'''<radialGradient id="haze" cx="0.12" cy="0.30" r="0.6">
      <stop offset="0" stop-color="{CHART_MID}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="{CHART_MID}" stop-opacity="0"/></radialGradient>''')
    # tone-shifting stroke for flow lines (deep on light left -> bright on dark right)
    s.append(f'''<linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{CHART_DEEP}"/>
      <stop offset="0.34" stop-color="{CHART_MID}"/>
      <stop offset="0.62" stop-color="{CHART}"/>
      <stop offset="1" stop-color="{CHART}"/></linearGradient>''')
    s.append(f'''<linearGradient id="flowsoft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{CHART_DEEP}" stop-opacity="0.5"/>
      <stop offset="0.6" stop-color="{CHART}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="{CHART}" stop-opacity="0.7"/></linearGradient>''')
    # edge vignette
    s.append(f'''<linearGradient id="vtop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{DARKER}" stop-opacity="0.55"/>
      <stop offset="0.18" stop-color="{DARKER}" stop-opacity="0"/>
      <stop offset="0.82" stop-color="{DARKER}" stop-opacity="0"/>
      <stop offset="1" stop-color="{DARKER}" stop-opacity="0.5"/></linearGradient>''')
    s.append('</defs>')

    s.append(f'<rect width="{W}" height="{H}" fill="url(#field)"/>')
    # warm chartreuse dawn behind everything on the left (avatar zone)
    s.append(f'<rect width="{W}" height="{H}" fill="url(#bloom)"/>')
    s.append(f'<rect width="{W}" height="{H}" fill="url(#haze)"/>')

    # revenant technical grid, fading in on the right
    grid = ['<g stroke="#D4F24B" stroke-opacity="0.05" stroke-width="1">']
    for gx in range(820, W, 60):
        grid.append(f'<line x1="{gx}" y1="0" x2="{gx}" y2="{H}"/>')
    for gy in range(60, H, 60):
        grid.append(f'<line x1="820" y1="{gy}" x2="{W}" y2="{gy}"/>')
    grid.append('</g>')
    s.append("".join(grid))

    # flow lines (organic lore signature), upper 65% so avatar zone stays calm
    baselines = [128, 176, 224, 272, 322]
    widths    = [2.4, 3.4, 2.6, 2.0, 1.6]
    grads     = ['flow','flow','flow','flowsoft','flowsoft']
    for i, (b, wd, g) in enumerate(zip(baselines, widths, grads)):
        d = flow_path(b, 44 + i*3, 880, i*0.62, tilt=-78)
        s.append(f'<path d="{d}" fill="none" stroke="url(#{g})" stroke-width="{wd}" '
                 f'stroke-linecap="round"/>')

    # swarm nodes on the dark right (chartreuse), a few linked
    nodes = [(980,360),(1060,300),(1180,360),(1250,250),(1350,330),
             (1120,420),(1300,180),(1420,260),(960,200),(1200,140)]
    sw = ['<g>']
    for j in range(len(nodes)):
        for k in range(j+1, len(nodes)):
            ax,ay = nodes[j]; bx,by = nodes[k]
            dist = math.hypot(ax-bx, ay-by)
            if dist < 150:
                op = (1-dist/150)*0.22
                sw.append(f'<line x1="{ax}" y1="{ay}" x2="{bx}" y2="{by}" '
                          f'stroke="{CHART}" stroke-opacity="{op:.3f}" stroke-width="1"/>')
    for (nx,ny) in nodes:
        sw.append(f'<circle cx="{nx}" cy="{ny}" r="2.4" fill="{CHART}" fill-opacity="0.6"/>')
    sw.append('</g>')
    s.append("".join(sw))

    # revenant registration marks — corners (left=chartreuse on light, right=concrete on dark)
    s.append(reg_mark(34, 34, CHART_DEEP))
    s.append(reg_mark(34, H-34, CHART_DEEP))
    s.append(reg_mark(W-34, 34, CONCRETE))
    s.append(reg_mark(W-34, H-34, CONCRETE))
    # technical crosshair on the right (revenant)
    s.append(crosshair(W-150, 250, CONCRETE, r=8, sw=1.4))

    # the ONE signal-orange tick — revenant's signal, a deliberate accent on the right
    s.append(f'<rect x="{W-300}" y="244" width="11" height="11" fill="{SIGNAL}"/>')
    s.append(f'<line x1="{W-289}" y1="250" x2="{W-160}" y2="250" stroke="{SIGNAL}" '
             f'stroke-opacity="0.5" stroke-width="1.4"/>')

    s.append(f'<rect width="{W}" height="{H}" fill="url(#vtop)"/>')
    s.append('</svg>')
    return "\n".join(s)


# ===================================================================
# DIRECTION B — "Warm Field": single warm graphite field (evolution of
# the current banner), bright chartreuse flow + revenant marks/grid +
# one orange accent. No big light bloom — cohesive single surface.
# ===================================================================
def direction_field():
    s = [header()]
    s.append('<defs>')
    s.append(f'''<linearGradient id="bg2" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#16170F"/>
      <stop offset="0.55" stop-color="#101108"/>
      <stop offset="1" stop-color="{DARKER}"/></linearGradient>''')
    s.append(f'''<radialGradient id="glow2" cx="0.30" cy="0.5" r="0.7">
      <stop offset="0" stop-color="{CHART}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="{CHART}" stop-opacity="0"/></radialGradient>''')
    s.append(f'''<linearGradient id="flow2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{CHART_DEEP}"/>
      <stop offset="0.5" stop-color="{CHART_MID}"/>
      <stop offset="1" stop-color="{CHART}"/></linearGradient>''')
    s.append(f'''<linearGradient id="v2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{DARKER}" stop-opacity="0.5"/>
      <stop offset="0.2" stop-color="{DARKER}" stop-opacity="0"/>
      <stop offset="0.8" stop-color="{DARKER}" stop-opacity="0"/>
      <stop offset="1" stop-color="{DARKER}" stop-opacity="0.5"/></linearGradient>''')
    s.append('</defs>')
    s.append(f'<rect width="{W}" height="{H}" fill="url(#bg2)"/>')
    s.append(f'<rect width="{W}" height="{H}" fill="url(#glow2)"/>')

    # full-width faint grid
    grid = ['<g stroke="#D4F24B" stroke-opacity="0.035" stroke-width="1">']
    for gx in range(60, W, 60):
        grid.append(f'<line x1="{gx}" y1="0" x2="{gx}" y2="{H}"/>')
    for gy in range(60, H, 60):
        grid.append(f'<line x1="0" y1="{gy}" x2="{W}" y2="{gy}"/>')
    grid.append('</g>')
    s.append("".join(grid))

    baselines = [150, 205, 260, 315, 360]
    widths    = [2.2, 3.2, 2.6, 2.0, 1.5]
    for i, (b, wd) in enumerate(zip(baselines, widths)):
        d = flow_path(b, 52 + i*2, 760, i*0.7, tilt=-40)
        op = 0.95 if i < 3 else 0.6
        s.append(f'<path d="{d}" fill="none" stroke="url(#flow2)" stroke-width="{wd}" '
                 f'stroke-opacity="{op}" stroke-linecap="round"/>')

    # corners — concrete (revenant)
    for (cx, cy) in [(34,34),(W-34,34),(34,H-34),(W-34,H-34)]:
        s.append(reg_mark(cx, cy, CONCRETE))
    s.append(crosshair(W-150, 250, CONCRETE, r=8, sw=1.4))
    # one orange accent
    s.append(f'<rect x="{W-300}" y="244" width="11" height="11" fill="{SIGNAL}"/>')
    s.append(f'<line x1="{W-289}" y1="250" x2="{W-160}" y2="250" stroke="{SIGNAL}" '
             f'stroke-opacity="0.5" stroke-width="1.4"/>')

    s.append(f'<rect width="{W}" height="{H}" fill="url(#v2)"/>')
    s.append('</svg>')
    return "\n".join(s)


def write_and_raster(name, svg):
    svg_path = os.path.join(OUT, name + ".svg")
    png_path = os.path.join(OUT, name + ".png")
    with open(svg_path, "w") as f:
        f.write(svg)
    if shutil.which("rsvg-convert"):
        subprocess.run(["rsvg-convert", "-w", str(W*2), "-h", str(H*2),
                        svg_path, "-o", png_path], check=True)
        print("wrote", svg_path, "and", png_path, "(@2x)")
    else:
        print("wrote", svg_path, "(no rsvg-convert for PNG)")


if __name__ == "__main__":
    write_and_raster("lore-x-banner-dawn", direction_dawn())
    write_and_raster("lore-x-banner-field", direction_field())
