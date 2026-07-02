# 🛡️ ANTI-PF | Cybersecurity Portfolio

> A modern cybersecurity-inspired portfolio showcasing projects, certifications, cloud deployments, and hands-on security learning.

![Status](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED)
![AWS](https://img.shields.io/badge/Cloud-AWS-FF9900)
![OpenShift](https://img.shields.io/badge/Platform-OpenShift-EE0000)
![Cloudflare](https://img.shields.io/badge/CDN-Cloudflare-F38020)

---

## 🌐 Live Website

### Primary Domain
🔗 **https://aryancybsec.dpdns.org**

### OpenShift Deployment
🔗 **https://anti-pf-frontend-artx-3002-dev.apps.rm2.thpm.p1.openshiftapps.com/**

---

## ✨ Features

- 🛡️ Cybersecurity-inspired UI/UX
- 📱 Fully responsive design
- 👨‍💻 About section
- ⚡ Interactive skills showcase
- 🏆 Certifications & achievements
- 📂 Project portfolio
- 📧 Contact form with email integration
- 🎵 Audio controls & theme switching
- 🕹️ Hidden CTF elements and easter eggs
- 🐳 Dockerized deployment
- ☁️ AWS EC2 hosting
- 🔴 Red Hat OpenShift deployment
- 🌍 Custom domain with Cloudflare
- 🔒 HTTPS, SSL, and CDN protection
- ⚙️ Automated CI/CD pipelines using GitHub Actions

---

## 🏗️ Architecture

```text
GitHub Repository
│
├── GitHub Actions
│   ├── OpenShift Deployment
│   └── AWS EC2 Deployment
│
├── Docker Containers
│   ├── React Frontend
│   └── Node.js Backend
│
└── Cloudflare
    ├── DNS Management
    ├── HTTPS Enforcement
    ├── CDN Caching
    └── Security Protection
```

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Tailwind CSS
- Framer Motion
- React Icons

### Backend

- Node.js
- Express.js
- Nodemailer
- REST APIs

### DevOps & Cloud

- Docker
- Docker Compose
- GitHub Actions
- AWS EC2
- Red Hat OpenShift
- Kubernetes
- Cloudflare
- Linux (Ubuntu)

### Security & Tools

- Git
- GitHub
- SSH Key Authentication
- SSL/TLS
- TryHackMe
- Docker Security Practices

---

## 📂 Project Structure

```text
ANTI-PF/
│
├── .github/
│   └── workflows/
│       ├── frontend.yml
│       └── aws-deploy.yml
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── portfolio/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── route.yaml
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Deployment

### AWS Infrastructure

- Ubuntu EC2 Instance
- Docker Compose
- GitHub Actions CI/CD
- Automatic deployment on push
- Cloudflare DNS & SSL

### OpenShift Infrastructure

- Containerized frontend deployment
- GitHub Container Registry (GHCR)
- Kubernetes manifests
- Automated rollout through GitHub Actions

---

## ⚙️ CI/CD Workflow

Every push to the `main` branch triggers:

### OpenShift Pipeline

```text
Git Push
   ↓
GitHub Actions
   ↓
Build Docker Image
   ↓
Push to GHCR
   ↓
OpenShift Rollout Restart
```

### AWS Pipeline

```text
Git Push
   ↓
GitHub Actions
   ↓
SSH into EC2
   ↓
git pull origin main
   ↓
docker compose up -d --build
```

---

## 🔐 Security Features

- Cloudflare Proxy Protection
- HTTPS Enforcement
- Automatic HTTPS Rewrites
- SSH Key Authentication
- Docker Container Isolation
- Custom Domain Configuration
- Secure Contact Form Handling

---

## 📈 Future Improvements

- [ ] Health Check Endpoints
- [ ] Docker Healthchecks
- [ ] Fail2Ban Integration
- [ ] Uptime Monitoring
- [ ] Automated Backups
- [ ] Security Headers Hardening
- [ ] Infrastructure Monitoring Dashboard

---

## 👨‍💻 Author

### Aryan Singh

**B.Sc. Information Technology Graduate**

- 🛡️ Cybersecurity Enthusiast
- ☕ Aspiring Java Backend Developer
- ☁️ Cloud Security Learner
- 🔍 SOC & Threat Detection Enthusiast
- 🚩 Active TryHackMe Learner

LinkedIn: *https://www.linkedin.com/in/-aryan-artx-*

Portfolio: **https://aryancybsec.dpdns.org**

---

## ⭐ Support

If you found this project interesting, please consider giving it a **star ⭐**.

Contributions, suggestions, and feedback are always welcome!

---

> "Learn, Build, Break, Secure, Repeat."
