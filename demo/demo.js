/**
 * Standalone Premium Mouse Interaction Script
 * Google Antigravity Inspired
 * Includes: 
 *   1. Custom Follow Cursor (GSAP)
 *   2. WebGL 3D Interactive Particle Grid (Three.js)
 */

// ==========================================
// 1. CUSTOM FOLLOW CURSOR (GSAP ENGINE)
// ==========================================
class CustomCursor {
  constructor() {
    this.cursor = document.getElementById("custom-cursor");
    this.cursorText = document.getElementById("cursor-text");
    this.cursorIcon = document.getElementById("cursor-icon");
    
    if (!this.cursor) return;

    this.isHovering = false;
    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  init() {
    // Đặt vị trí ban đầu ẩn con trỏ tùy biến đi
    gsap.set(this.cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    // Tạo các hàm QuickTo của GSAP để cập nhật tọa độ siêu mượt và tối ưu hiệu năng
    this.quickX = gsap.quickTo(this.cursor, "x", { duration: 0.35, ease: "power3.out" });
    this.quickY = gsap.quickTo(this.cursor, "y", { duration: 0.35, ease: "power3.out" });

    // Theo dõi tọa độ chuột thật
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      this.quickX(this.mouseX);
      this.quickY(this.mouseY);
    });

    // Ẩn con trỏ custom khi rời màn hình
    document.addEventListener("mouseleave", () => {
      this.hide();
    });

    this.setupHoverListeners();
  }

  setupHoverListeners() {
    // Đăng ký tương tác với toàn bộ các phần tử có class ".interactive-card"
    const interactiveElements = document.querySelectorAll(".interactive-card");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        const text = el.getAttribute("data-cursor") || "Explore";
        const icon = el.getAttribute("data-icon") || "arrow_forward";
        
        this.show(text, icon);
      });

      el.addEventListener("mouseleave", () => {
        this.hide();
      });
    });
  }

  show(text, icon) {
    this.isHovering = true;
    this.cursorText.textContent = text;
    this.cursorIcon.textContent = icon;

    gsap.to(this.cursor, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.5)"
    });
  }

  hide() {
    this.isHovering = false;
    gsap.to(this.cursor, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
  }
}

// ==========================================================
// 2. WEBGL 3D INTERACTIVE PARTICLE GRID (THREE.JS PHYSICS)
// ==========================================================
class ParticleGrid {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Chuột 2D chuẩn hóa phục vụ Raycasting
    this.mouse = new THREE.Vector2(-9999, -9999);
    this.targetMouse = new THREE.Vector2(-9999, -9999);

    this.init();
    this.createParticles();
    this.setupEvents();
    this.animate();
  }

  init() {
    // Khởi tạo Scene
    this.scene = new THREE.Scene();

    // Khởi tạo Camera góc nhìn 3D rộng
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 32;

    // Khởi tạo Renderer hiệu năng cao
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Sử dụng Raycaster để bắn tia từ Camera qua tọa độ chuột chạm vào không gian 3D
    this.raycaster = new THREE.Raycaster();
    
    // Tạo mặt phẳng ảo nằm song song với Grid để dò tọa độ chuột 3D chính xác
    const planeGeo = new THREE.PlaneGeometry(150, 150);
    const planeMat = new THREE.MeshBasicMaterial({ visible: false });
    this.raycastPlane = new THREE.Mesh(planeGeo, planeMat);
    this.scene.add(this.raycastPlane);
  }

  createParticles() {
    const cols = 90; // Mật độ số cột hạt
    const rows = 55; // Mật độ số hàng hạt
    const numParticles = cols * rows;

    // Phân bổ bộ nhớ cho tọa độ hiện tại, tọa độ gốc và vận tốc của từng hạt
    const positions = new Float32Array(numParticles * 3);
    const initialPositions = new Float32Array(numParticles * 3);
    const velocities = new Float32Array(numParticles * 3);

    const spacingX = 0.75;
    const spacingY = 0.75;
    const startX = -((cols - 1) * spacingX) / 2;
    const startY = -((rows - 1) * spacingY) / 2;

    let index = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacingX;
        const y = startY + r * spacingY;
        const z = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        initialPositions[index * 3] = x;
        initialPositions[index * 3 + 1] = y;
        initialPositions[index * 3 + 2] = z;

        velocities[index * 3] = 0;
        velocities[index * 3 + 1] = 0;
        velocities[index * 3 + 2] = 0;

        index++;
      }
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('initialPos', new THREE.BufferAttribute(initialPositions, 3));
    this.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Vẽ Canvas nhỏ hình tròn mờ biên để làm texture mịn cho từng điểm sáng hạt
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    // Cấu hình vật liệu hạt sáng, tạo chiều sâu 3D mượt mà
    this.material = new THREE.PointsMaterial({
      color: 0x3279f9, // Sắc xanh biểu trưng của Google Antigravity
      size: 0.28,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleSystem = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.particleSystem);
  }

  setupEvents() {
    window.addEventListener('mousemove', (e) => {
      // Chuyển đổi tọa độ chuột 2D của trình duyệt về dạng chuẩn [-1, 1] của WebGL
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Theo dõi thay đổi kích thước trình duyệt
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(this.width, this.height);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Nội suy mượt vị trí chuột (giảm sốc khi di chuột nhanh)
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.08;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.08;

    // Chiếu tia dò điểm chạm
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.raycastPlane);
    
    let touchPoint = null;
    if (intersects.length > 0) {
      touchPoint = intersects[0].point;
    }

    const positions = this.geometry.attributes.position.array;
    const initialPos = this.geometry.attributes.initialPos.array;
    const velocities = this.geometry.attributes.velocity.array;

    const numParticles = positions.length / 3;

    // Các tham số cấu hình vật lý đàn hồi
    const springFactor = 0.035; // Hệ số kéo về vị trí cũ (lực đàn hồi lò xo)
    const damping = 0.94;       // Lực cản không khí (giảm rung chấn)
    const repelRadius = 7.0;    // Bán kính tác dụng đẩy của chuột
    const repelForce = 0.35;    // Cường độ lực đẩy hạt

    for (let i = 0; i < numParticles; i++) {
      const idx = i * 3;

      // Khoảng cách từ vị trí hiện tại của hạt đến vị trí gốc
      let dx = positions[idx] - initialPos[idx];
      let dy = positions[idx + 1] - initialPos[idx + 1];
      let dz = positions[idx + 2] - initialPos[idx + 2];

      // Gia tốc phục hồi hướng về tâm gốc
      let ax = -dx * springFactor;
      let ay = -dy * springFactor;
      let az = -dz * springFactor;

      if (touchPoint) {
        // Khoảng cách từ hạt tới vị trí chuột trong không gian 3D
        const mx = positions[idx] - touchPoint.x;
        const my = positions[idx + 1] - touchPoint.y;
        const distSq = mx * mx + my * my;
        const dist = Math.sqrt(distSq);

        // Hạt nằm trong phạm vi tương tác của chuột -> Nhận lực đẩy xuyên tâm
        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          const repellingPower = force * repelForce;
          
          ax += (mx / dist) * repellingPower;
          ay += (my / dist) * repellingPower;
        }
      }

      // Cập nhật vận tốc tích lũy
      velocities[idx] = (velocities[idx] + ax) * damping;
      velocities[idx + 1] = (velocities[idx + 1] + ay) * damping;
      velocities[idx + 2] = (velocities[idx + 2] + az) * damping;

      // Cập nhật tọa độ hạt thực tế
      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];
    }

    // Đánh dấu để GPU Render lưới hạt ở vị trí mới
    this.geometry.attributes.position.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
}

// Khởi chạy toàn bộ hệ thống tương tác cao cấp
document.addEventListener("DOMContentLoaded", () => {
  new CustomCursor();
  new ParticleGrid("particle-bg");
});
