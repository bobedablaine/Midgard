import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';

const TerminalComponent = ({ terminalId }) => {
    const terminalRef = useRef(null);
    const term = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (terminalRef.current && !term.current) {
                try {
                    term.current = new Terminal({
                        cursorBlink: true,
                        theme: {
                            background: '#1a1a1a',
                            foreground: '#ffffff'
                        },
                        rows: 15,
                        cols: 80
                    });

                    const fitAddon = new FitAddon();
                    term.current.loadAddon(fitAddon);
                    term.current.loadAddon(new WebLinksAddon());

                    term.current.open(terminalRef.current);
                    
                    setTimeout(() => {
                        fitAddon.fit();
                    }, 100);

                    term.current.writeln(`Terminal ${terminalId}`);
                    term.current.writeln('Type "help" for available commands\n');
                } catch (error) {
                    console.error('Terminal initialization error:', error);
                }
            }
        }, 0);

        return () => {
            if (term.current) {
                term.current.dispose();
            }
        };
    }, [terminalId]);

    return (
        <div 
            ref={terminalRef} 
            style={{ 
                height: '300px', 
                width: '100%',
                padding: '10px',
                backgroundColor: '#1a1a1a'
            }} 
        />
    );
};

export default TerminalComponent;