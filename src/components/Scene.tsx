"use client";

import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BRASS, INK, LIMESTONE, stage } from "@/lib/stage";

const rnd = (n: number) => {
  const v = Math.sin(n * 91.17 + 47.3) * 43758.5453;
  return v - Math.floor(v);
};

/** Parchment page atlas — crisp typography drawn once to a shared canvas. */
function makePageTexture(lines: string[], accent = INK) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(0.5, 0.5);
  ctx.fillStyle = "#EFE6D2";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = rnd(i) > 0.5 ? "rgba(120,96,60,0.05)" : "rgba(255,255,255,0.12)";
    ctx.fillRect(rnd(i + 90) * 512, rnd(i + 180) * 512, 2 + rnd(i + 300) * 5, 2);
  }
  ctx.strokeStyle = "rgba(197,155,72,0.75)";
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, 452, 452);
  ctx.lineWidth = 1;
  ctx.strokeRect(42, 42, 428, 428);
  ctx.fillStyle = accent;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  lines.forEach((line, i) => {
    const size = line.length > 14 ? 46 : line.length > 8 ? 62 : 86;
    ctx.font = `${size}px Georgia, 'Times New Roman', serif`;
    ctx.fillText(line, 256, 150 + i * (lines.length > 3 ? 88 : 116));
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeLimestoneTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#EDE8DC";
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = rnd(i) > 0.5 ? "#DED5C2" : "#F7F2E8";
    ctx.fillRect(rnd(i + 100) * 128, rnd(i + 200) * 128, 1.5, 1.5);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ── Architecture ─────────────────────────────────────────────── */

function Arcade({ texture }: { texture: THREE.Texture }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, 0);
    shape.lineTo(-0.5, 3.1);
    shape.quadraticCurveTo(0, 4.25, 0.5, 3.1);
    shape.lineTo(0.5, 0);
    shape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(0.26, 0);
    hole.lineTo(0.26, 2.95);
    hole.quadraticCurveTo(0, 3.8, -0.26, 2.95);
    hole.lineTo(-0.26, 0);
    hole.closePath();
    shape.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false, curveSegments: 6 });
    g.computeVertexNormals();
    return g;
  }, []);

  const arches = useRef<THREE.InstancedMesh>(null);
  const bays = useRef<THREE.InstancedMesh>(null);
  const shelves = useRef<THREE.InstancedMesh>(null);
  const spines = useRef<THREE.InstancedMesh>(null);
  const vault = useRef<THREE.InstancedMesh>(null);
  const vaultShell = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    const palette = ["#EDE6D6", "#1B365D", "#C59B48", "#7A3E3E"];
    let bayIndex = 0;
    let shelfIndex = 0;
    let spineIndex = 0;

    for (let i = 0; i < 20; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 4 - Math.floor(i / 2) * 5.8;

      if (arches.current) {
        dummy.position.set(side * 3.1, -1.6, z);
        dummy.rotation.set(0, side > 0 ? Math.PI : 0, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        arches.current.setMatrixAt(i, dummy.matrix);
      }
      if (bays.current) {
        dummy.position.set(side * 4.25, 0.05, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1.5, 3.1, 1.3);
        dummy.updateMatrix();
        bays.current.setMatrixAt(bayIndex++, dummy.matrix);
      }
      // 4 horizontal shelves per bay
      if (shelves.current) {
        for (let s = 0; s < 4; s++) {
          const sy = -1.3 + s * 0.78;
          dummy.position.set(side * 4.25, sy, z + 0.02);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1.42, 0.04, 1.25);
          dummy.updateMatrix();
          shelves.current.setMatrixAt(shelfIndex++, dummy.matrix);
        }
      }
      // ~12-13 book spines per bay across 4 shelves => 250 total
      if (spines.current) {
        for (let k = 0; k < 13 && spineIndex < 250; k++) {
          const row = Math.floor(k / 4); // 4 shelves worth, 3-4 per shelf
          const col = k % 4;
          const shelfY = -1.3 + row * 0.78;
          dummy.position.set(
            side * 4.25 + (col - 1.5) * 0.28 + (rnd(i * 40 + k) - 0.5) * 0.04,
            shelfY + 0.22 + rnd(i * 20 + k) * 0.08,
            z + 0.55,
          );
          dummy.rotation.set(0, 0, (rnd(i + k + 300) - 0.5) * 0.06);
          dummy.scale.set(0.1, 0.34 + rnd(i + k + 500) * 0.12, 0.22);
          dummy.updateMatrix();
          spines.current.setMatrixAt(spineIndex, dummy.matrix);
          spines.current.setColorAt(spineIndex, new THREE.Color(palette[Math.floor(rnd(i + k + 700) * palette.length)]));
          spineIndex++;
        }
      }
      if (vault.current && i < 10) {
        dummy.position.set(0, 2.55, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        vault.current.setMatrixAt(i, dummy.matrix);
      }
      if (vaultShell.current && i < 10) {
        dummy.position.set(0, 2.6, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        vaultShell.current.setMatrixAt(i, dummy.matrix);
      }
    }
    [arches, bays, shelves, spines, vault, vaultShell].forEach((ref) => {
      if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
    });
    if (spines.current?.instanceColor) spines.current.instanceColor.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh ref={arches} args={[geometry, undefined, 20]}>
        <meshStandardMaterial map={texture} color="#FFFFFF" roughness={0.78} metalness={0.02} />
      </instancedMesh>
      {/* Cornices anchoring vault to arch pillar tops along both sides */}
      <mesh position={[-3.05, 2.55, -22]}>
        <boxGeometry args={[0.22, 0.12, 58]} />
        <meshStandardMaterial map={texture} color="#E5DDCF" roughness={0.7} metalness={0.02} />
      </mesh>
      <mesh position={[3.05, 2.55, -22]}>
        <boxGeometry args={[0.22, 0.12, 58]} />
        <meshStandardMaterial map={texture} color="#E5DDCF" roughness={0.7} metalness={0.02} />
      </mesh>
      {/* Honey oak open bays */}
      <instancedMesh ref={bays} args={[undefined, undefined, 20]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#B88B58" roughness={0.78} />
      </instancedMesh>
      {/* 4 shelves per bay */}
      <instancedMesh ref={shelves} args={[undefined, undefined, 80]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#A67C52" roughness={0.72} />
      </instancedMesh>
      {/* Book spines filling shelves */}
      <instancedMesh ref={spines} args={[undefined, undefined, 250]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.68} />
      </instancedMesh>
      {/* Brushed brass vault ribs */}
      <instancedMesh ref={vault} args={[undefined, undefined, 10]}>
        <torusGeometry args={[3.05, 0.04, 6, 20, Math.PI]} />
        <meshStandardMaterial color="#C59B48" metalness={0.65} roughness={0.32} />
      </instancedMesh>
      {/* Luminous skylight shell above vault */}
      <instancedMesh ref={vaultShell} args={[undefined, undefined, 10]}>
        <torusGeometry args={[3.15, 0.12, 6, 20, Math.PI]} />
        <meshBasicMaterial color="#FFFDF7" transparent opacity={0.28} side={THREE.BackSide} />
      </instancedMesh>
    </group>
  );
}

function Floor() {
  return (
    <group position={[0, -1.6, -18]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 74]} />
        <meshBasicMaterial color="#EDE8DC" />
      </mesh>
      <gridHelper args={[74, 37, "#C59B48", "#C59B48"]} position={[0, 0.01, 0]} material-transparent material-opacity={0.12} />
    </group>
  );
}

/* ── Floating books ───────────────────────────────────────────── */

function Book({
  position, rotation, lines, range, phase,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  lines: [string[], string[]];
  range: [number, number];
  phase: number;
}) {
  const group = useRef<THREE.Group>(null);
  const scaleTarget = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const textures = useMemo(
    () => [makePageTexture(lines[0]), makePageTexture(lines[1], "#1B365D")],
    [lines],
  );
  const page = useMemo(() => new THREE.PlaneGeometry(1.15, 1.45, 12, 1), []);

  useLayoutEffect(() => {
    const positions = page.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const u = (x + 0.575) / 1.15;
      positions.setZ(i, Math.sin(u * Math.PI) * 0.14);
    }
    positions.needsUpdate = true;
    page.computeVertexNormals();
  }, [page]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 0.6 + phase) * 0.07;
    const active = stage.activeModule >= range[0] && stage.activeModule <= range[1];
    const target = active ? 1.09 : 1;
    scaleTarget.set(target, target, target);
    group.current.scale.lerp(scaleTarget, 0.08);
    group.current.rotation.y = rotation[1] + stage.pointerX * 0.08 + (active ? 0.06 : 0);
    group.current.rotation.x = rotation[0] + stage.pointerY * 0.04;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0.12, 0]} geometry={page}>
        <meshStandardMaterial map={textures[0]} side={THREE.DoubleSide} roughness={0.9} />
      </mesh>
      <mesh position={[0.6, 0, 0]} rotation={[0, -0.12, 0]} geometry={page}>
        <meshStandardMaterial map={textures[1]} side={THREE.DoubleSide} roughness={0.9} />
      </mesh>
      {/* Parchment/linen covers with fine gold trim */}
      <mesh position={[-0.6, 0, -0.055]} rotation={[0, 0.12, 0]}>
        <boxGeometry args={[1.22, 1.52, 0.035]} />
        <meshStandardMaterial color="#DFD5C0" roughness={0.85} />
      </mesh>
      <mesh position={[0.6, 0, -0.055]} rotation={[0, -0.12, 0]}>
        <boxGeometry args={[1.22, 1.52, 0.035]} />
        <meshStandardMaterial color="#DFD5C0" roughness={0.85} />
      </mesh>
      <mesh position={[-0.6, 0, -0.074]} rotation={[0, 0.12, 0]}>
        <boxGeometry args={[1.25, 1.55, 0.008]} />
        <meshStandardMaterial color="#C59B48" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.6, 0, -0.074]} rotation={[0, -0.12, 0]}>
        <boxGeometry args={[1.25, 1.55, 0.008]} />
        <meshStandardMaterial color="#C59B48" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

function LibraryBooks() {
  const books = useMemo(() => [
    { position: [-0.35, 2.1, -3.5] as [number, number, number], rotation: [0.05, 0.48, 0.04] as [number, number, number], lines: [["Deutsch", "A1→B2"], ["IELTS"]] as [string[], string[]], range: [0, 2] as [number, number] },
    { position: [2.2, 0.35, -7] as [number, number, number], rotation: [0.04, -0.5, -0.03] as [number, number, number], lines: [["∫ SM ∑", "TCF", "∑ SVT ∫"], ["دار العلم"]] as [string[], string[]], range: [3, 5] as [number, number] },
    { position: [-1.9, 0.1, -13] as [number, number, number], rotation: [0.03, 0.35, 0.02] as [number, number, number], lines: [["Français"], ["DELF B2"]] as [string[], string[]], range: [2, 2] as [number, number] },
    { position: [1.9, 0.25, -18] as [number, number, number], rotation: [0.02, -0.35, -0.02] as [number, number, number], lines: [["Bac Éco"], ["Régional 1ère Bac"]] as [string[], string[]], range: [5, 6] as [number, number] },
  ], []);

  return (
    <group>
      {books.map((book, i) => <Book key={i} {...book} phase={i * 1.7} />)}
    </group>
  );
}

/* ── Armillary sphere ─────────────────────────────────────────── */

function Armillary() {
  const rings = useRef<Array<THREE.Mesh | null>>([]);
  const core = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.z = t * (0.12 + i * 0.04) + i * Math.PI * 0.38;
      ring.rotation.y = Math.PI * 0.25 + t * (0.08 + i * 0.025);
    });
    if (core.current) core.current.rotation.y = t * 0.3;
  });

  return (
    <group position={[1.15, 2.7, -14]}>
      {[1.45, 1.18, 0.92, 0.66].map((radius, i) => (
        <mesh key={i} ref={(el) => { rings.current[i] = el; }} rotation={[Math.PI * 0.38, 0.25, i * 0.45]}>
          <torusGeometry args={[radius, 0.045, 8, 36]} />
          <meshStandardMaterial color="#C59B48" metalness={0.72} roughness={0.28} />
        </mesh>
      ))}
      <mesh ref={core}>
        <sphereGeometry args={[0.22, 16, 12]} />
        <meshStandardMaterial color="#E8CA86" emissive="#C59B48" emissiveIntensity={0.45} metalness={0.7} roughness={0.28} />
      </mesh>
    </group>
  );
}

/* ── Camera & world ───────────────────────────────────────────── */

function CameraRig() {
  const target = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  useFrame(({ camera }) => {
    target.current.set(
      stage.camX + stage.presetX + stage.pointerX * 0.2,
      stage.camY + stage.presetY + stage.pointerY * 0.12,
      stage.camZ + stage.presetZ,
    );
    look.current.set(stage.targetX, stage.targetY, stage.targetZ);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(look.current);
  });
  return null;
}

function Responsive({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ size }) => group.current?.scale.setScalar(size.width < 700 ? 0.72 : 1));
  return <group ref={group}>{children}</group>;
}

function World() {
  const texture = useMemo(() => makeLimestoneTexture(), []);

  return (
    <>
      <color attach="background" args={[LIMESTONE]} />
      <fog attach="fog" args={[LIMESTONE, 18, 62]} />
      <CameraRig />
      <hemisphereLight args={["#F5EFE4", "#C7B69B", 1.05]} />
      <directionalLight position={[5, 9, 2]} intensity={1.35} color="#FFF6E5" />
      <Floor />
      <Responsive>
        <Arcade texture={texture} />
        <LibraryBooks />
        <Armillary />
      </Responsive>

    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "default", stencil: false, depth: true }}
      camera={{ position: [-1.5, 2.3, 9], fov: 45 }}
    >
      <Suspense fallback={null}>
        <World />
      </Suspense>
    </Canvas>
  );
}
