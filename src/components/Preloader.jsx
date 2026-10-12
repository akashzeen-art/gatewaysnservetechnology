import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { INDIA_ID, originMarkets } from '../data/indiaLaunchRoutes';

const TOTAL_MS = 4400;
const FILL_MS = 3800;
const SAFETY_MS = 9000;

const ease = [0.22, 1, 0.36, 1];

// Business hubs for each origin market, plus Mumbai as India's landing point.
const HUBS = {
  AE: { latitude: 25.2, longitude: 55.27 },
  US: { latitude: 40.71, longitude: -74.0 },
  GB: { latitude: 51.51, longitude: -0.13 },
  SG: { latitude: 1.35, longitude: 103.82 },
  DE: { latitude: 50.11, longitude: 8.68 },
  AU: { latitude: -33.87, longitude: 151.21 },
  SA: { latitude: 24.71, longitude: 46.68 },
  NL: { latitude: 52.37, longitude: 4.9 },
  CA: { latitude: 43.65, longitude: -79.38 },
  JP: { latitude: 35.68, longitude: 139.69 },
  FR: { latitude: 48.86, longitude: 2.35 },
  MY: { latitude: 3.14, longitude: 101.69 },
  IN: { latitude: 19.08, longitude: 72.88 },
};

const ORIGIN_IDS = originMarkets.map((m) => m.id);

// Each card flies in from the screen corner named by `pos`.
const REACH = [
  { pos: 'tl', value: '1.45 Billion', label: 'Users', delay: 1.2 },
  { pos: 'bl', value: '740+ Million', label: 'Smartphone users', delay: 1.5 },
  { pos: 'tr', value: '806 Million', label: 'Internet users', delay: 1.8 },
  { pos: 'br', value: '554.9 Million', label: 'UPI intent users', delay: 2.1 },
];

const COLOR = {
  ocean: 0x0a1428,
  land: 0x16233d,
  coast: 0x94a3b8,
  origin: 0x3b2a1f,
  originEdge: 0xfdba74,
  saffron: 0xff9933,
  white: 0xf8fafc,
  green: 0x138808,
  routeIdle: 0x475569,
  route: 0xff9933,
  packet: 0xfde68a,
};

function GatewayGlobe({ litCount, entered, onReady, reducedMotion }) {
  const hostRef = useRef(null);
  const rootRef = useRef(null);
  const linesRef = useRef([]);
  const packetSeriesRef = useRef(null);
  const litRef = useRef(0);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const root = am5.Root.new(hostRef.current);
    rootRef.current = root;
    if (root._logo) root._logo.dispose();

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        wheelX: 'none',
        wheelY: 'none',
        projection: am5map.geoOrthographic(),
        rotationX: reducedMotion ? -72 : 10,
        rotationY: -22,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }),
    );

    const ocean = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    ocean.mapPolygons.template.setAll({
      fill: am5.color(COLOR.ocean),
      fillOpacity: 1,
      strokeOpacity: 0,
    });
    ocean.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

    const graticule = chart.series.push(am5map.GraticuleSeries.new(root, { step: 15 }));
    graticule.mapLines.template.setAll({
      stroke: am5.color(COLOR.coast),
      strokeOpacity: 0.06,
      strokeWidth: 0.6,
    });

    const countries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ', INDIA_ID],
      }),
    );
    countries.mapPolygons.template.setAll({
      fill: am5.color(COLOR.land),
      stroke: am5.color(COLOR.coast),
      strokeOpacity: 0.22,
      strokeWidth: 0.5,
    });
    countries.mapPolygons.template.adapters.add('fill', (fill, target) =>
      ORIGIN_IDS.includes(target.dataItem?.get('id')) ? am5.color(COLOR.origin) : fill,
    );
    countries.mapPolygons.template.adapters.add('stroke', (stroke, target) =>
      ORIGIN_IDS.includes(target.dataItem?.get('id')) ? am5.color(COLOR.originEdge) : stroke,
    );
    countries.mapPolygons.template.adapters.add('strokeOpacity', (opacity, target) =>
      ORIGIN_IDS.includes(target.dataItem?.get('id')) ? 0.55 : opacity,
    );

    const india = chart.series.push(
      am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_worldLow, include: [INDIA_ID] }),
    );
    india.mapPolygons.template.setAll({
      fillGradient: am5.LinearGradient.new(root, {
        rotation: 90,
        stops: [
          { color: am5.color(COLOR.saffron) },
          { color: am5.color(COLOR.white) },
          { color: am5.color(COLOR.green) },
        ],
      }),
      stroke: am5.color(COLOR.white),
      strokeWidth: 1,
      strokeOpacity: 0.9,
      shadowColor: am5.color(COLOR.saffron),
      shadowBlur: 18,
      shadowOpacity: 0.6,
    });

    const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(COLOR.routeIdle),
      strokeOpacity: 0.25,
      strokeWidth: 1,
    });

    const hubSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    hubSeries.bullets.push((_root, _series, dataItem) => {
      const isIndia = dataItem.get('id') === INDIA_ID;
      const container = am5.Container.new(root, {});
      const ring = container.children.push(
        am5.Circle.new(root, {
          radius: isIndia ? 6 : 3,
          fill: am5.color(isIndia ? COLOR.green : COLOR.saffron),
          fillOpacity: 0.4,
        }),
      );
      container.children.push(
        am5.Circle.new(root, {
          radius: isIndia ? 4 : 2.2,
          fill: am5.color(COLOR.white),
          stroke: am5.color(isIndia ? COLOR.green : COLOR.saffron),
          strokeWidth: isIndia ? 2 : 1,
        }),
      );
      if (!reducedMotion) {
        const to = isIndia ? 18 : 9;
        ring.animate({ key: 'radius', from: isIndia ? 5 : 2.5, to, duration: 1500, loops: Infinity });
        ring.animate({ key: 'fillOpacity', from: 0.5, to: 0, duration: 1500, loops: Infinity });
      }
      return am5.Bullet.new(root, { sprite: container });
    });

    const hubItems = {};
    [...ORIGIN_IDS, INDIA_ID].forEach((id) => {
      hubItems[id] = hubSeries.pushDataItem({ ...HUBS[id], id });
    });

    const packetSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    packetSeries.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 2.4,
          fill: am5.color(COLOR.packet),
          shadowColor: am5.color(COLOR.saffron),
          shadowBlur: 10,
          shadowOpacity: 0.9,
        }),
      }),
    );
    packetSeriesRef.current = packetSeries;

    linesRef.current = ORIGIN_IDS.map((id) =>
      lineSeries.pushDataItem({ pointsToConnect: [hubItems[id], hubItems[INDIA_ID]] }),
    );

    if (!reducedMotion) {
      chart.animate({
        key: 'rotationX',
        from: 10,
        to: -72,
        duration: TOTAL_MS + 600,
        easing: am5.ease.out(am5.ease.cubic),
      });
    }

    root.events.once('frameended', () => onReadyRef.current?.());
    chart.appear(900, 0);

    return () => {
      linesRef.current = [];
      packetSeriesRef.current = null;
      rootRef.current = null;
      litRef.current = 0;
      root.dispose();
    };
    // The globe is built once; motion preference is read at mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // amCharts sizes its canvas from the transformed (mid-scale-in) box and
  // won't re-measure on its own, so resize once the entrance has settled.
  useEffect(() => {
    if (entered) rootRef.current?.resize();
  }, [entered]);

  useEffect(() => {
    const lines = linesRef.current;
    const packets = packetSeriesRef.current;
    for (let i = litRef.current; i < Math.min(litCount, lines.length); i += 1) {
      const sprite = lines[i].get('mapLine');
      if (sprite && !sprite.isDisposed()) {
        sprite.setAll({ stroke: am5.color(COLOR.route), strokeWidth: 1.6 });
        sprite.animate({ key: 'strokeOpacity', from: 0.25, to: 0.8, duration: 400 });
      }
      if (packets && !reducedMotion) {
        const packet = packets.pushDataItem({ lineDataItem: lines[i], positionOnLine: 0 });
        packet.animate({
          key: 'positionOnLine',
          from: 0,
          to: 1,
          duration: 1100 + (i % 3) * 220,
          loops: Infinity,
        });
      }
    }
    litRef.current = Math.max(litRef.current, litCount);
  }, [litCount, reducedMotion]);

  return <div ref={hostRef} className="preloader-globe-canvas" aria-hidden="true" />;
}

export default function Preloader({ onDone }) {
  const reducedMotion = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [globeReady, setGlobeReady] = useState(false);
  const [globeEntered, setGlobeEntered] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const done = progress >= 100;

  // Every route is lit a little before the bar completes.
  const litCount = Math.min(ORIGIN_IDS.length, Math.ceil((progress / 92) * ORIGIN_IDS.length));
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let frame;
    const start = performance.now();
    const tick = (now) => {
      // rAF timestamps can be slightly earlier than `start`, so clamp at 0 too.
      const t = Math.min(1, Math.max(0, (now - start) / FILL_MS));
      setProgress(Math.round((1 - (1 - t) ** 2) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const min = window.setTimeout(() => setMinElapsed(true), TOTAL_MS);
    const safety = window.setTimeout(() => setVisible(false), SAFETY_MS);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(min);
      window.clearTimeout(safety);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (minElapsed && globeReady) setVisible(false);
  }, [minElapsed, globeReady]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
        onDone?.();
      }}
    >
      {visible && (
        <motion.div
          className="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading nSERVE Payment Gateway"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="preloader-stars" aria-hidden="true" />

          <motion.div
            className="preloader-brand"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="preloader-wordmark-wrap">
              <span className="preloader-boom-ring" aria-hidden="true" />
              <span className="preloader-wordmark nav-tricolor">nSERVE</span>
            </span>
            <span className="preloader-tagline">
              <span className="preloader-tagline-left">Payment Gateway</span>
              <span className="preloader-tagline-right">for India</span>
            </span>
          </motion.div>

          <div className="preloader-stage">
            <motion.div
              className="preloader-globe"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.25 }}
              transition={{ duration: 0.9, ease }}
              onAnimationComplete={() => setGlobeEntered(true)}
            >
              <div className="preloader-atmosphere" aria-hidden="true" />
              <GatewayGlobe
                litCount={litCount}
                entered={globeEntered}
                onReady={() => setGlobeReady(true)}
                reducedMotion={reducedMotion}
              />
            </motion.div>

            {REACH.map(({ pos, value, label, delay }) => (
              <div
                key={pos}
                className={`reach-card reach-card--${pos}`}
                style={{ animationDelay: `${delay}s` }}
              >
                <span className="reach-card-eyebrow">Access to</span>
                <strong className="reach-card-value">{value}</strong>
                <span className="reach-card-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="preloader-foot">
            <div className="preloader-meter">
              <span>{done ? 'Gateway ready' : 'Routing payments to India'}</span>
              <span className="preloader-percent">{progress}%</span>
            </div>
            <div className="preloader-bar" aria-hidden="true">
              <div className="preloader-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
