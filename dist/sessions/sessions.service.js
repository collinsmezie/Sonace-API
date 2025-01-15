"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
let SessionsService = class SessionsService {
    constructor() {
        this.sessions = [];
    }
    getSessions() {
        return this.sessions;
    }
    getSession(id) {
        return this.sessions.find((session) => session.id === id);
    }
    createSession(createSessionDto) {
        const newSession = {
            ...createSessionDto,
            id: Date.now()
        };
        this.sessions.push(newSession);
        return newSession;
    }
    updateSession(id, updateSessionDto) {
        this.sessions = this.sessions.map((session) => {
            if (session.id === id) {
                return { ...session, ...updateSessionDto };
            }
            return session;
        });
        return this.getSession(id);
    }
    removeSession(id) {
        const toBeRemoved = this.getSession(id);
        if (!toBeRemoved) {
            console.log("toBeRemoved", toBeRemoved);
            return toBeRemoved;
        }
        this.sessions = this.sessions.filter((session) => session.id !== id);
        return toBeRemoved;
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)()
], SessionsService);
//# sourceMappingURL=sessions.service.js.map