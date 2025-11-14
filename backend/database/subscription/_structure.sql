/**
 * @schema subscription
 * Handles account management, subscription services, and tenant operations.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'subscription')
BEGIN
    EXEC('CREATE SCHEMA subscription');
END;
GO
